import { writable } from "svelte/store";

const DEFAULT_STATE = {
	selectedLoveSongTypes: [],
	selectedGenres: [],
	performerSearchString: "",
	songSearchString: ""
};
export default writable(DEFAULT_STATE);
