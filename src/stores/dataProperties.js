import { derived } from "svelte/store";
import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
import searchAndFilter, {
	selectedGenres,
	selectedGenders,
	selectedSongs
} from "./searchAndFilter";

export const songIsSelected = derived(
	[searchAndFilter, selectedGenres, selectedGenders, selectedSongs],
	([$searchAndFilter, $selectedGenres, $selectedGenders, $selectedSongs]) =>
		songsData.map(({ song }) => {
			const genderSelected =
				$selectedGenders.includes(song[SONG_DATA_COLUMNS_ENUM.gender]) ||
				$selectedGenders.length === 0;

			const genreSelected =
				$selectedGenres.includes(song[SONG_DATA_COLUMNS_ENUM.generic_genre]) ||
				$selectedGenres.length === 0;

			const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
			const loveSongTypeSelected =
				$searchAndFilter.selectedLoveSongTypes.includes(loveSongType) ||
				$searchAndFilter.selectedLoveSongTypes.length === 0;

			const performerSelected =
				$searchAndFilter.performerSearchString.length === 0 ||
				song[SONG_DATA_COLUMNS_ENUM.performer]
					.toLowerCase()
					.includes($searchAndFilter.performerSearchString.toLowerCase());

			const songSelected =
				$selectedSongs.includes(song[SONG_DATA_COLUMNS_ENUM.song]) ||
				$selectedSongs.length === 0;

			return (
				genderSelected &&
				genreSelected &&
				loveSongTypeSelected &&
				performerSelected &&
				songSelected
			);
		}),
	[]
);
