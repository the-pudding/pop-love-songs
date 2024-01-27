import { derived } from "svelte/store";
import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
import {
	selectedGenres,
	selectedGenders,
	selectedSongs,
	selectedLoveSongTypes,
	selectedPerformers,
	performerSearchStrings,
	timeRange
} from "./searchAndFilter.js";

export const songIsSelected = derived(
	[
		selectedPerformers,
		performerSearchStrings,
		selectedLoveSongTypes,
		selectedGenres,
		selectedGenders,
		selectedSongs,
		timeRange
	],
	([
		$selectedPerformers,
		$performerSearchStrings,
		$selectedLoveSongTypes,
		$selectedGenres,
		$selectedGenders,
		$selectedSongs,
		$timeRange
	]) =>
		songsData.map(({ song }) => {
			const genderSelected =
				$selectedGenders.includes(song[SONG_DATA_COLUMNS_ENUM.gender]) ||
				$selectedGenders.length === 0;

			const genreSelected =
				$selectedGenres.includes(song[SONG_DATA_COLUMNS_ENUM.generic_genre]) ||
				$selectedGenres.length === 0;

			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			const loveSongTypeSelected =
				$selectedLoveSongTypes.includes(loveSongType) ||
				$selectedLoveSongTypes.length === 0;

			const performerSelected =
				$selectedPerformers.length === 0 ||
				$selectedPerformers.includes(song[SONG_DATA_COLUMNS_ENUM.performer]);

			const includesAPerformerSearchString =
				$performerSearchStrings.length === 0 ||
				$performerSearchStrings.some((performerSearchString) =>
					song[SONG_DATA_COLUMNS_ENUM.performer]
						.toLowerCase()
						.includes(performerSearchString.toLowerCase())
				);

			const songSelected =
				$selectedSongs.includes(song[SONG_DATA_COLUMNS_ENUM.song]) ||
				$selectedSongs.length === 0;

			const withinTimeRange =
				(!$timeRange.startYear || $timeRange.startYear <= song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]) &&
				(!$timeRange.endYear || $timeRange.endYear >= song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);
			return (
				genderSelected &&
				genreSelected &&
				loveSongTypeSelected &&
				performerSelected &&
				includesAPerformerSearchString &&
				songSelected &&
				withinTimeRange
			);
		}),
	[]
);
