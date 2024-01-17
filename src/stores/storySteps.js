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
	}
};

export const storySteps = [steps.opening, steps.beyonce];

export const currentStoryStepIndex = writable(0);
