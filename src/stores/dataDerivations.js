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
	selectedSong,
	selectedPerformers,
	typesTreatedAsNonLoveSongs,
	songSearchString,
	performerSearchString
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
	[selectedPerformers, performerSearchString],
	([$selectedPerformers, $performerSearchString]) =>
		songsData.map(({ song }) => {
			const performers = getArrayOfPerformers(song);
			if ($performerSearchString) {
				return performers.some((performer) =>
					performer.toLowerCase().includes($performerSearchString.toLowerCase())
				);
			}
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
	[selectedSong, songSearchString, playing],
	([$selectedSong, $songSearchString, $playing]) => {
		const maybeSelectedSong = $selectedSong.song || [];
		const formattedSelectedSong = {
			songName: maybeSelectedSong[SONG_DATA_COLUMNS_ENUM.song],
			year: maybeSelectedSong[SONG_DATA_COLUMNS_ENUM.date_as_decimal]
		};
		const selectedSongsWithPlaying = [formattedSelectedSong, $playing].filter(
			(song) => song?.songName
		);

		return songsData.map(({ song }) => {
			if ($songSearchString) {
				return song[SONG_DATA_COLUMNS_ENUM.song]
					.toLowerCase()
					.includes($songSearchString.toLowerCase());
			}
			return (
				selectedSongsWithPlaying.length === 0 ||
				selectedSongsWithPlaying.some(
					({ songName, year }) =>
						song[SONG_DATA_COLUMNS_ENUM.song] === songName &&
						// just to be safe
						Math.floor(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]) ===
							Math.floor(year)
				)
			);
		});
	}
);

export const songIsSelected = derived(
	[loveSongTypeSelected, performerSelected, songSelected],
	(subStores) => {
		return songsData.map((song, index) =>
			subStores.every((subStore) => subStore[index])
		);
	},
	[]
);

export const songIsVisible = derived(
	[loveSongTypeSelected, performerSelected, songSelected, currentStoryStep],
	([
		$loveSongTypeSelected,
		$performerSelected,
		$songSelected,
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

			return loveSongTypeVisible && performerVisible && songVisible;
		}),
	[]
);

export const selectedSongsData = derived(songIsSelected, ($songIsSelected) =>
	songsData.filter((song, index) => $songIsSelected[index])
);

export const visibleSongsData = derived(songIsVisible, ($songIsVisible) =>
	songsData.filter((song, index) => $songIsVisible[index])
);

// Annotations

export const annotatedSongsData = derived(
	[visibleSongsData, currentStoryStep],
	([$visibleSongsData, $currentStoryStep]) => {
		const { adjacentAnnotations = [], offsetAnnotations = [] } =
			$currentStoryStep.visualEncodings.songAnnotations;
		if (!adjacentAnnotations.length && !offsetAnnotations.length) {
			return [];
		}
		return $visibleSongsData.filter(({ song }) =>
			songInAnnotations(song, $currentStoryStep.visualEncodings.songAnnotations)
		);
	},
	[]
);
