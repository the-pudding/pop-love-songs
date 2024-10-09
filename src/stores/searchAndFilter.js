import { writable, derived } from "svelte/store";

export const songSearchString = writable("");
export const selectedSong = writable({ song: null, songIndex: null });
export const performerSearchString = writable("");
export const selectedPerformers = writable([]);

export const aSearchFilterExists = derived(
	[songSearchString, selectedSong, performerSearchString, selectedPerformers],
	([
		$songSearchString,
		$selectedSong,
		$performerSearchString,
		$selectedPerformers
	]) => {
		return (
			$songSearchString ||
			$selectedSong ||
			$performerSearchString ||
			$selectedPerformers.length
		);
	}
);
export const aSearchBarIsFocused = writable(false);

export const typesTreatedAsNonLoveSongs = writable([]);

export const showAggregateSnakeChart = writable(false);

export const showAnnotations = derived(
	[aSearchFilterExists, aSearchBarIsFocused],
	([$aSearchFilterExists, $aSearchBarIsFocused]) => {
		return !$aSearchBarIsFocused && !$aSearchFilterExists;
	}
);