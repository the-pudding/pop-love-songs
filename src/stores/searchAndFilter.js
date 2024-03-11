import { writable } from "svelte/store";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data.js";

export const selectedGenders = writable([]);
export const selectedSongs = writable([]);
export const selectedLoveSongTypes = writable([]);
export const selectedPerformers = writable([]);
export const timeRange = writable({
	startYear: MIN_YEAR,
	endYear: MAX_YEAR
});

export const columnsToFilterVisibilityOn = writable([]);
export const visibleButNotSelectedLoveSongTypes = writable([]);
