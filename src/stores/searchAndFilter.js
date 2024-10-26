import { writable, derived } from "svelte/store";

export const songSearchString = writable("");
export const previewedSong = writable({ song: null, songIndex: null });
export const selectedSong = writable({ song: null, songIndex: null });
export const performerSearchString = writable("");
export const previewedPerformer = writable("");
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
			$selectedSong.song ||
			$performerSearchString ||
			$selectedPerformers.length
		);
	}
);

export const aPreviewExists = derived(
	[previewedSong, previewedPerformer],
	([$previewedSong, $previewedPerformer]) => {
		return $previewedSong.song || $previewedPerformer;
	}
);

export const aSearchBarIsFocused = writable(false);

export const openedDropdown = writable(null);

export const typesTreatedAsNonLoveSongs = writable([]);

export const showAggregateSnakeChart = writable(false);

export const showAnnotations = derived(
	[aSearchFilterExists, aPreviewExists],
	([$aSearchFilterExists, $aPreviewExists]) => {
		return !$aSearchFilterExists && !$aPreviewExists;
	}
);