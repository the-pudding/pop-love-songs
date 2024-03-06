import { derived } from "svelte/store";
import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
import { getArrayOfPerformers } from "$data/data-utils.js";
import {
	selectedGenres,
	selectedGenders,
	selectedSongs,
	selectedLoveSongTypes,
	selectedPerformers,
	timeRange,
	columnsToFilterVisibilityOn
} from "./searchAndFilter.js";

export const genderSelected = derived(
	[selectedGenders],
	([$selectedGenders]) =>
		songsData.map(
			({ song }) =>
				$selectedGenders.includes(song[SONG_DATA_COLUMNS_ENUM.gender]) ||
				$selectedGenders.length === 0
		),
	[]
);

export const genreSelected = derived(
	[selectedGenres],
	([$selectedGenres]) =>
		songsData.map(
			({ song }) =>
				$selectedGenres.includes(song[SONG_DATA_COLUMNS_ENUM.generic_genre]) ||
				$selectedGenres.length === 0
		),
	[]
);

export const loveSongTypeSelected = derived(
	[selectedLoveSongTypes],
	([$selectedLoveSongTypes]) =>
		songsData.map(({ song }) => {
			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			return (
				$selectedLoveSongTypes.includes(loveSongType) ||
				$selectedLoveSongTypes.length === 0
			);
		}),
	[]
);

export const performerSelected = derived(
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

export const songSelected = derived(
	[selectedSongs],
	([$selectedSongs]) =>
		songsData.map(
			({ song }) =>
				$selectedSongs.includes(song[SONG_DATA_COLUMNS_ENUM.song]) ||
				$selectedSongs.length === 0
		),
	[]
);

export const withinTimeRange = derived(
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
		genreSelected,
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

export const songIsVisible = derived(
	[
		genderSelected,
		genreSelected,
		loveSongTypeSelected,
		performerSelected,
		songSelected,
		withinTimeRange,
		columnsToFilterVisibilityOn
	],
	([
		$genderSelected,
		$genreSelected,
		$loveSongTypeSelected,
		$performerSelected,
		$songSelected,
		$withinTimeRange,
		$columnsToFilterVisibilityOn
	]) =>
		songsData.map((song, index) => {
			// If we're filtering visibility based on a given column, then it must be selected to be visible.
			const genderVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.gender
			)
				? $genderSelected[index]
				: true;
			const genreVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.generic_genre
			)
				? $genreSelected[index]
				: true;
			const loveSongTypeVisible = $columnsToFilterVisibilityOn.includes(
				SONG_DATA_COLUMNS_ENUM.love_song_sub_type
			)
				? $loveSongTypeSelected[index]
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
				genreVisible &&
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
