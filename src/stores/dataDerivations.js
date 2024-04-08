import { derived } from "svelte/store";
import songsData, { MAX_YEAR, MIN_YEAR } from "$data/songs-data.js";
import {
	LOVE_SONG_TYPE_CONSTANTS,
	SONG_DATA_COLUMNS_ENUM
} from "$data/data-constants";
import { getArrayOfPerformers } from "$data/data-utils.js";
import {
	selectedGenders,
	selectedSongs,
	selectedLoveSongTypes,
	selectedPerformers,
	timeRange,
	columnsToFilterVisibilityOn,
	visibleButNotSelectedLoveSongTypes
} from "./searchAndFilter.js";

const genderSelected = derived(
	[selectedGenders],
	([$selectedGenders]) =>
		songsData.map(
			({ song }) =>
				$selectedGenders.some((selectedGender) =>
					song[SONG_DATA_COLUMNS_ENUM.type_and_gender_list_str].includes(
						`${selectedGender}|`
					)
				) || $selectedGenders.length === 0
		),
	[]
);

const loveSongTypeSelected = derived(
	[selectedLoveSongTypes, visibleButNotSelectedLoveSongTypes],
	([$selectedLoveSongTypes, $visibleButNotSelectedLoveSongTypes]) =>
		songsData.map(({ song }) => {
			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			const passesSpecialCase =
				!$visibleButNotSelectedLoveSongTypes.includes(loveSongType) ||
				$visibleButNotSelectedLoveSongTypes.length === 0;
			return (
				passesSpecialCase &&
				($selectedLoveSongTypes.includes(loveSongType) ||
					$selectedLoveSongTypes.length === 0)
			);
		}),
	[]
);

const performerSelected = derived(
	[selectedPerformers],
	([$selectedPerformers]) =>
		songsData.map(({ song }) => {
			const performers = getArrayOfPerformers(song);
			return (
				$selectedPerformers.length === 0 ||
				$selectedPerformers.some((selectedPerformer) =>
					performers.includes(selectedPerformer)
				)
			);
		}),
	[]
);

const songSelected = derived(
	[selectedSongs],
	([$selectedSongs]) =>
		songsData.map(
			({ song }) =>
				$selectedSongs.includes(song[SONG_DATA_COLUMNS_ENUM.song]) ||
				$selectedSongs.length === 0
		),
	[]
);

const withinTimeRange = derived(
	[timeRange],
	([$timeRange]) =>
		songsData.map(({ song }) => {
			const startYear = $timeRange.startYear;
			const endYear = $timeRange.endYear;
			const dateAsDecimal = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
			return (
				(!startYear || startYear <= dateAsDecimal) &&
				(!endYear || endYear >= dateAsDecimal)
			);
		}),
	[]
);

export const songIsSelected = derived(
	[
		genderSelected,
		loveSongTypeSelected,
		performerSelected,
		songSelected,
		withinTimeRange
	],
	(subStores) =>
		songsData.map((song, index) =>
			subStores.every((subStore) => subStore[index])
		),
	[]
);

// Note: this is just so we can compare to the 60s percentage no matter what time range we're selecting at
export const selectedSongsDataIgnoringTime = derived(
	[
		genderSelected,
		loveSongTypeSelected,
		performerSelected,
		songSelected
		// withinTimeRange
	],
	(subStores) =>
		songsData.filter((song, index) =>
			subStores.every((subStore) => subStore[index])
		),
	[]
);

export const songIsVisible = derived(
	[
		genderSelected,
		loveSongTypeSelected,
		performerSelected,
		songSelected,
		withinTimeRange,
		columnsToFilterVisibilityOn,
		visibleButNotSelectedLoveSongTypes
	],
	([
		$genderSelected,
		$loveSongTypeSelected,
		$performerSelected,
		$songSelected,
		$withinTimeRange,
		$columnsToFilterVisibilityOn,
		$visibleButNotSelectedLoveSongTypes
	]) =>
		songsData.map((song, index) => {
			// If we're filtering visibility based on a given column, then it must be selected to be visible.
			const genderVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.type_and_gender_list_str
			)
				? $genderSelected[index]
				: true;
			const loveSongTypeVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.love_song_sub_type
			)
				? $loveSongTypeSelected[index] ||
					$visibleButNotSelectedLoveSongTypes.includes(
						songsData[index].song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
					)
				: true;
			const performerVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.performers_list_str
			)
				? $performerSelected[index]
				: true;
			const songVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.song
			)
				? $songSelected[index]
				: true;
			const timeRangeVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.date_as_decimal
			)
				? $withinTimeRange[index]
				: true;

			return (
				genderVisible &&
				loveSongTypeVisible &&
				performerVisible &&
				songVisible &&
				timeRangeVisible
			);
		}),
	[]
);

export const selectedSongsData = derived(songIsSelected, ($songIsSelected) =>
	songsData.filter((song, index) => $songIsSelected[index])
);

export const visibleSongsData = derived(songIsVisible, ($songIsVisible) =>
	songsData.filter((song, index) => $songIsVisible[index])
);

function isWithinYearRange(dateAsDecimal, minYear, maxYear) {
	if (minYear && dateAsDecimal < minYear) {
		return false;
	}
	if (maxYear && dateAsDecimal > maxYear) {
		return false;
	}
	return true;
}

export function getLoveSongPercentage(
	selectedSongsData,
	selectedLoveSongTypes,
	minYear = MIN_YEAR,
	maxYear = MAX_YEAR
) {
	const selectedLoveSongsPopularityScore = selectedSongsData.reduce(
		(acc, { song }) => {
			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			const dateAsDecimal = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
			if (
				(selectedLoveSongTypes.length === 0 &&
					loveSongType !== LOVE_SONG_TYPE_CONSTANTS.notALoveSong) ||
				selectedLoveSongTypes.includes(loveSongType)
			) {
				if (isWithinYearRange(dateAsDecimal, minYear, maxYear)) {
					return acc + song[SONG_DATA_COLUMNS_ENUM.popularity_score];
				}
			}
			return acc;
		},
		0
	);

	const allSongsWithinRangePopularityScore = songsData.reduce(
		(acc, { song }) => {
			const dateAsDecimal = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
			if (isWithinYearRange(dateAsDecimal, minYear, maxYear)) {
				return acc + song[SONG_DATA_COLUMNS_ENUM.popularity_score];
			}
			return acc;
		},
		0
	);
	return (
		(100 * selectedLoveSongsPopularityScore) /
		allSongsWithinRangePopularityScore
	);
}

export const percentageOfLoveSongsCurrentlySelected = derived(
	[selectedSongsData, selectedLoveSongTypes, timeRange],
	([$selectedSongsData, $selectedLoveSongTypes, $timeRange]) => {
		return getLoveSongPercentage(
			$selectedSongsData,
			$selectedLoveSongTypes,
			$timeRange.startYear,
			$timeRange.endYear
		);
	}
);

export const percentageOfLoveSongsDuring1959To1969 = derived(
	[selectedSongsDataIgnoringTime, selectedLoveSongTypes],
	([$selectedSongsDataIgnoringTime, $selectedLoveSongTypes]) => {
		return getLoveSongPercentage(
			// Note: we want to be able to *reliably* compare to the 60s and not have it accidentally filtered out
			// if we happen to look at a selection that doesn't include the 60s.
			$selectedSongsDataIgnoringTime,
			$selectedLoveSongTypes,
			1959,
			1969
		);
	}
);

export const maxYearFromSelectedSongs = derived(
	[selectedSongsData],
	([$selectedSongsData]) => {
		return Math.max(
			...$selectedSongsData.map(
				({ song }) => song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]
			)
		);
	},
	0
);

export const percentageOfLoveSongsDuringLast10YearsOfSelection = derived(
	[selectedSongsData, selectedLoveSongTypes, maxYearFromSelectedSongs],
	([$selectedSongsData, $selectedLoveSongTypes, $maxYearFromSelectedSongs]) => {
		const tenYearsBefore = Math.max(MIN_YEAR, $maxYearFromSelectedSongs - 10);

		return getLoveSongPercentage(
			$selectedSongsData,
			$selectedLoveSongTypes,
			tenYearsBefore,
			$maxYearFromSelectedSongs
		);
	}
);
