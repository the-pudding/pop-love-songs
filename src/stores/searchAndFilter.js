import { writable } from "svelte/store";

export const selectedGenres = writable([]);

// TODO: break into smaller stores
export default writable({
	selectedLoveSongTypes: [],
	performerSearchString: "",
	songSearchString: "",
	selectedSongInfo: {
		song: undefined,
		position: { x: undefined, y: undefined }
	}
});
