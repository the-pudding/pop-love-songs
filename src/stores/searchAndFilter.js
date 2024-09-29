import { writable, derived } from "svelte/store";

export const songSearchString = writable("");
export const selectedSongs = writable([]);
export const performerSearchString = writable("");
export const selectedPerformers = writable([]);

export const aSearchFilterExists = derived(
	[songSearchString, selectedSongs, performerSearchString, selectedPerformers],
	([
		$songSearchString,
		$selectedSongs,
		$performerSearchString,
		$selectedPerformers
	]) => {
		return (
			$songSearchString ||
			$selectedSongs.length ||
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