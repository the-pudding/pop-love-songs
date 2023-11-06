import { writable } from "svelte/store";

const DEFAULT_STATE = {
	seletedLovesSongTypes: [],
	performerSearchString: "",
	songSearchString: ""
};
export default writable(DEFAULT_STATE);
