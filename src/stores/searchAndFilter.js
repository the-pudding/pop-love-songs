import { writable } from "svelte/store";

export const SEARCH_AND_FILTER_DEFAULT_STATE = {
	selectedLoveSongTypes: [],
	performerSearchString: "",
	songSearchString: "",
	selectedSongInfo: {
		song: undefined,
		position: { x: undefined, y: undefined }
	}
};

export const selectedGenres = writable([]);

export default writable(SEARCH_AND_FILTER_DEFAULT_STATE);
