import { writable } from "svelte/store";
const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
	selectedPerformers: [],
	performerSearchStrings: [],
	selectedGenders: [],
	selectedGenres: [],
	selectedSongs: [],

	timeRange: {
		startYear: null,
		endYear: null
	}
};

const steps = {
	// INTRO TODOS: we need the ability to NOT show love song type colors
	// This gets into adding a  branch of specification properties focused on
	// (not so much filtering as) encoding (x/y pos, color).
	opening: {
		text: "This is all 5k Billboard Top 10 hits from 1958-2022.",
		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE
	},
	someThingsHaveChangedLittle: {
		text: "Some things have changed little -- artists still sing the same sort of poppy love songs",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			// TODO: fill in
			selectedSongs: ["Single Ladies (Put A Ring On It)"]
		}
	},
	someThingsHaveChangedALot: {
		text: "... but, in other ways, things have changed a ton.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			// TODO: fill in
			selectedSongs: ["WAP"]
		}
	},
	isTheLoveSongDying: {
		text: "It raises a question: Is the love song dying?",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		}
	},

	// BODY

	/// blah
	highlightingSpecificSongs: {
		text: "Here are some songs",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: ["Single Ladies (Put A Ring On It)"]
		}
	},
	beyonce: {
		text: "... more importantly, Beyonce! And Gaga",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			performerSearchStrings: ["Beyonce", "Lady Gaga"]
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
	// Intro: is the love song dying?
	steps.opening,
	steps.someThingsHaveChangedLittle,
	steps.someThingsHaveChangedALot,
	steps.isTheLoveSongDying
	// Body: moving chronilogically through time, highlighting specific songs, artists, types of love songs
	// Conclusion
];

export const currentStoryStepIndex = writable(0);
