import { writable } from "svelte/store";
const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
	selectedGenders: [],
	selectedGenres: [],
	performerSearchString: "",
	songSearchString: "",
	selectedSongInfo: {
		song: undefined,
		position: { x: undefined, y: undefined }
	}
};

const steps = {
	opening: {
		text: "Welcome to the viz! This is a story step.",
		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE
	},
	beyonce: {
		text: "... more importantly, Beyonce!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			performerSearchString: "Beyonce"
		}
	},
	filterToRock: {
		text: "This is just the genre of Rock",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedGenres: ["ROCK"]
		}
	},
	filterToSerenade: {
		text: "This is just the love song type Serenade",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: ["Serenade"]
		}
	}
};

export const storySteps = [
	steps.opening,
	steps.beyonce,
	steps.filterToRock,
	steps.filterToSerenade
];

export const currentStoryStepIndex = writable(0);
