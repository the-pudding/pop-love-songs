import { writable } from "svelte/store";

export const selectedGenres = writable([]);
export const selectedGenders = writable([]);
export const selectedSongs = writable([]);

export const timeRange = writable({
	startYear: null,
	endYear: null
});

// TODO: break into smaller stores
export default writable({
	selectedLoveSongTypes: [],
	performerSearchString: ""
});
