import { writable } from "svelte/store";
const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
	selectedGenders: [],
	selectedGenres: [],
	selectedSongs: [],

	timeRange: {
		startYear: null,
		endYear: null
	},

	performerSearchString: ""
};

const steps = {
	opening: {
		text: "Welcome to the viz! This is a story step.",
		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE
	},
	justThe70s: {
		text: "This is just the 70s",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			timeRange: {
				startYear: 1970,
				endYear: 1979
			}
		}
	},
	highlightingSpecificSongs: {
		text: "Here are some songs",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: ["Single Ladies (Put A Ring On It)"]
		}
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
	steps.justThe70s,
	steps.beyonce,
	steps.highlightingSpecificSongs,
	steps.filterToRock,
	steps.filterToSerenade
];

export const currentStoryStepIndex = writable(0);
