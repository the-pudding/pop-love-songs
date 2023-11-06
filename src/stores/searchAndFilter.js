import { writable } from "svelte/store";

const DEFAULT_STATE = {
	selectedLoveSongTypes: [],
	performerSearchString: "",
	songSearchString: ""
};
export default writable(DEFAULT_STATE);
