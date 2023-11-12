import { writable } from "svelte/store";

const DEFAULT_STATE = {
	selectedLoveSongTypes: [],
	selectedGenres: [],
	performerSearchString: "",
	songSearchString: "",
	selectedSongInfo: {
		song: undefined,
		position: {x: undefined, y: undefined},
	}
};
export default writable(DEFAULT_STATE);
