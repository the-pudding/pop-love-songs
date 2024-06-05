import { writable } from "svelte/store";
import { MAX_DATE, MIN_DATE } from "$data/songs-data.js";

export const selectedGenders = writable([]);
export const selectedSongs = writable([]);
export const selectedLoveSongTypes = writable([]);
export const selectedPerformers = writable([]);
export const timeRange = writable({
	startYear: MIN_DATE,
	endYear: MAX_DATE
});

export const columnsToFilterVisibilityOn = writable([]);
export const visibleButNotSelectedLoveSongTypes = writable([]);
export const typesTreatedAsNonLoveSongs = writable([]);
