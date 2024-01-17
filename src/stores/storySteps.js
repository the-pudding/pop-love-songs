import { writable } from "svelte/store";
import { SEARCH_AND_FILTER_DEFAULT_STATE } from "$stores/searchAndFilter";

const steps = {
	opening: {
		text: "Welcome to the viz! This is a story step.",
		searchAndFilterState: SEARCH_AND_FILTER_DEFAULT_STATE
	},
	beyonce: {
		text: "... more importantly, Beyonce!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_DEFAULT_STATE,
			performerSearchString: "Beyonce"
		}
	},
	filterToRock: {
		text: "This is just the genre of Rock",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_DEFAULT_STATE,
			selectedGenres: ["ROCK"]
		}
	},
	filterToSerenade: {
		text: "This is just the love song type Serenade",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_DEFAULT_STATE,
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
