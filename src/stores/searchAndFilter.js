import { writable } from "svelte/store";

export const selectedGenres = writable([]);
export const selectedGenders = writable([]);
export const selectedSongs = writable([]);
export const selectedLoveSongTypes = writable([]);
export const selectedPerformers = writable([]);

export const timeRange = writable({
	startYear: null,
	endYear: null
});
