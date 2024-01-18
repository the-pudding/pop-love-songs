import { derived } from "svelte/store";
import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
import searchAndFilter, { selectedGenres } from "./searchAndFilter";

export const songIsSelected = derived(
	[searchAndFilter, selectedGenres],
	([$searchAndFilter, $selectedGenres]) =>
		songsData.map(({ song }) => {
			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];

			const genreSelected =
				$selectedGenres.includes(song[SONG_DATA_COLUMNS_ENUM.generic_genre]) ||
				$selectedGenres.length === 0;
			const loveSongTypeSelected =
				$searchAndFilter.selectedLoveSongTypes.includes(loveSongType) ||
				$searchAndFilter.selectedLoveSongTypes.length === 0;
			const performerSelected =
				$searchAndFilter.performerSearchString.length === 0 ||
				song[SONG_DATA_COLUMNS_ENUM.performer]
					.toLowerCase()
					.includes($searchAndFilter.performerSearchString.toLowerCase());
			const songSelected =
				$searchAndFilter.songSearchString.length === 0 ||
				song[SONG_DATA_COLUMNS_ENUM.song]
					.toLowerCase()
					.includes($searchAndFilter.songSearchString.toLowerCase());

			return (
				genreSelected &&
				loveSongTypeSelected &&
				performerSelected &&
				songSelected
			);
		}),
	[]
);
