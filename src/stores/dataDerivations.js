import { derived } from "svelte/store";
import songsData, { MAX_DATE, MIN_DATE } from "$data/songs-data.js";
import {
	LOVE_SONG_TYPE_CONSTANTS,
	SONG_DATA_COLUMNS_ENUM
} from "$data/data-constants";
import {
	getArrayOfPerformers,
	onlyShowOneDecimalPlaceIfLessThan10,
	songInAnnotations
} from "$data/data-utils.js";
import {
	selectedSongs,
	selectedPerformers,
	typesTreatedAsNonLoveSongs
} from "./searchAndFilter.js";
import { currentStoryStep } from "./storySteps.js";
import { playing } from "./audio.js";

const loveSongTypeSelected = derived(
	[currentStoryStep],
	([$currentStoryStep]) =>
		songsData.map(({ song }) => {
			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			const passesSpecialCase =
				!$currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(
					loveSongType
				) ||
				$currentStoryStep.searchAndFilterState
					.visibleButNotSelectedLoveSongTypes.length === 0;
			return (
				passesSpecialCase &&
				($currentStoryStep.searchAndFilterState.selectedLoveSongTypes.includes(
					loveSongType
				) ||
					$currentStoryStep.searchAndFilterState.selectedLoveSongTypes
						.length === 0)
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
	[selectedSongs, playing],
	([$selectedSongs, $playing]) => {
		const selectedSongNames = [...$selectedSongs, $playing?.songName].filter(
			(name) => !!name
		);

		return songsData.map(
			({ song }) =>
				selectedSongNames.includes(song[SONG_DATA_COLUMNS_ENUM.song]) ||
				selectedSongNames.length === 0
		);
	}
);

const withinTimeRange = derived(
	[currentStoryStep],
	([$currentStoryStep]) =>
		songsData.map(({ song }) => {
			const { timeRange } = $currentStoryStep.searchAndFilterState;
			const startYear = timeRange.startYear;
			const endYear = timeRange.endYear;
			const dateAsDecimal = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
			return (
				(!startYear || startYear <= dateAsDecimal) &&
				(!endYear || endYear >= dateAsDecimal)
			);
		}),
	[]
);

export const songIsSelected = derived(
	[loveSongTypeSelected, performerSelected, songSelected, withinTimeRange],
	(subStores) => {
		return songsData.map((song, index) =>
			subStores.every((subStore) => subStore[index])
		);
	},
	[]
);

// TODO: OPTIMIZATION @michelle basically this fires anytime a selection changes (eg loveSongTypeSelected), which triggers a lot of calculations & (most notably) can restart the force layout.
// However, this store needs ONLY to update if columnsToFilterVisibilityOn contains 1 or more items, or itself changed to have no items.
// My sense is that this is where we'd want to just implement a custom store
// ie one that subscribes to all this, but only broadcasts an update to *its* subscribers when the columnsToFilterVisibilityOn changes in the ways described above.
// Note this would also (likely) remove the need for: preventBubbleRestartBecauseTheUserIsMerelySearching
export const songIsVisible = derived(
	[
		loveSongTypeSelected,
		performerSelected,
		songSelected,
		withinTimeRange,
		currentStoryStep
	],
	([
		$loveSongTypeSelected,
		$performerSelected,
		$songSelected,
		$withinTimeRange,
		$currentStoryStep
	]) =>
		songsData.map((song, index) => {
			// If we're filtering visibility based on a given column, then it must be selected to be visible.
			const loveSongTypeVisible =
				$currentStoryStep.searchAndFilterState.columnsToFilterVisibilityOn.includes(
					SONG_DATA_COLUMNS_ENUM.love_song_sub_type
				)
					? $loveSongTypeSelected[index] ||
						$currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(
							songsData[index].song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
						)
					: true;
			const performerVisible =
				$currentStoryStep.searchAndFilterState.columnsToFilterVisibilityOn.includes(
					SONG_DATA_COLUMNS_ENUM.performers_list_str
				)
					? $performerSelected[index]
					: true;
			const songVisible =
				$currentStoryStep.searchAndFilterState.columnsToFilterVisibilityOn.includes(
					SONG_DATA_COLUMNS_ENUM.song
				)
					? $songSelected[index]
					: true;
			const timeRangeVisible =
				$currentStoryStep.searchAndFilterState.columnsToFilterVisibilityOn.includes(
					SONG_DATA_COLUMNS_ENUM.date_as_decimal
				)
					? $withinTimeRange[index]
					: true;

			return (
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
	typesTreatedAsNonLoveSongs,
	selectedSongsData,
	selectedLoveSongTypes,
	minYear = MIN_DATE,
	maxYear = MAX_DATE
) {
	const selectedLoveSongsPopularityScore = selectedSongsData.reduce(
		(acc, { song }) => {
			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			const dateAsDecimal = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];

			const isALoveSong =
				!typesTreatedAsNonLoveSongs.includes(loveSongType) &&
				loveSongType !== LOVE_SONG_TYPE_CONSTANTS.notALoveSong;
			if (
				(selectedLoveSongTypes.length === 0 && isALoveSong) ||
				selectedLoveSongTypes.includes(loveSongType)
			) {
				if (isWithinYearRange(dateAsDecimal, minYear, maxYear)) {
					return acc + song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10];
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
				return acc + song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10];
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
	[selectedSongsData, currentStoryStep, typesTreatedAsNonLoveSongs],
	([$selectedSongsData, $currentStoryStep, $typesTreatedAsNonLoveSongs]) => {
		return getLoveSongPercentage(
			$typesTreatedAsNonLoveSongs,
			$selectedSongsData,
			$currentStoryStep.searchAndFilterState.selectedLoveSongTypes,
			$currentStoryStep.searchAndFilterState.timeRange.startYear,
			$currentStoryStep.searchAndFilterState.timeRange.endYear
		);
	}
);

export const percentageOfLoveSongsDuring1959To1969 = derived(
	[songIsSelected, currentStoryStep, typesTreatedAsNonLoveSongs],
	([$songIsSelected, $currentStoryStep, $typesTreatedAsNonLoveSongs]) => {
		return getLoveSongPercentage(
			$typesTreatedAsNonLoveSongs,
			// Note: we want to be able to *reliably* compare to the 60s and not have it accidentally filtered out
			// if we happen to look at a selection that doesn't include the 60s.
			// TODO: OPTIMIZATION: since we're not allowing others to filter by year, we can remove songIsSelected
			$songIsSelected,
			$currentStoryStep.searchAndFilterState.selectedLoveSongTypes,
			MIN_DATE,
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

export const percentageOfLoveSongsDuringThe2020s = derived(
	[selectedSongsData, currentStoryStep, typesTreatedAsNonLoveSongs],
	([$selectedSongsData, $currentStoryStep, $typesTreatedAsNonLoveSongs]) => {
		return getLoveSongPercentage(
			$typesTreatedAsNonLoveSongs,
			$selectedSongsData,
			$currentStoryStep.searchAndFilterState.selectedLoveSongTypes,
			2020,
			MAX_DATE
		);
	}
);

export const percentChangeFrom60sToLast10Years = derived(
	[percentageOfLoveSongsDuring1959To1969, percentageOfLoveSongsDuringThe2020s],
	([
		$percentageOfLoveSongsDuring1959To1969,
		$percentageOfLoveSongsDuringThe2020s
	]) => {
		const change =
			$percentageOfLoveSongsDuringThe2020s -
			$percentageOfLoveSongsDuring1959To1969;
		return change / $percentageOfLoveSongsDuring1959To1969;
	}
);

export const formattedLoveSongPercentChange = derived(
	percentChangeFrom60sToLast10Years,
	($percentChangeFrom60sToLast10Years) => {
		// debugger;
		return `${$percentChangeFrom60sToLast10Years > 0 ? "+" : $percentChangeFrom60sToLast10Years < 0 ? "-" : ""}${onlyShowOneDecimalPlaceIfLessThan10(Math.abs(100 * $percentChangeFrom60sToLast10Years))}`;
	}
);

// Annotations

export const annotatedSongsData = derived(
	[visibleSongsData, currentStoryStep],
	([$visibleSongsData, $currentStoryStep]) => {
		if ($currentStoryStep.visualEncodings.songAnnotations.length === 0) {
			return [];
		}
		return $visibleSongsData.filter(({ song }) =>
			songInAnnotations(song, $currentStoryStep.visualEncodings.songAnnotations)
		);
	},
	[]
);
