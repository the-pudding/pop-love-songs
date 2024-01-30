import { derived, writable } from "svelte/store";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data.js";
import {
	fractionOfScreenFactory,
	getXPositionFromTime
} from "./forcePositionOptions-helper.js";

const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
	selectedPerformers: [],
	performerSearchStrings: [],
	selectedGenders: [],
	selectedGenres: [],
	selectedSongs: [],

	timeRange: {
		startYear: MIN_YEAR,
		endYear: MAX_YEAR
	}
};

const VISUAL_ENCODING_BLANK_STATE = {
	calculateXForcePosition: getXPositionFromTime,
	calculateYForcePosition: () => {}
};

const steps = {
	// INTRO TODOS: we need the ability to NOT show love song type colors
	// This gets into adding a  branch of specification properties focused on
	// (not so much filtering as) encoding (x/y pos, color).
	opening: {
		text: "These are the 5k songs from the last 60 years of Billboard Top 10",
		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE,
		visualEncodings: {
			calculateXForcePosition: fractionOfScreenFactory(0.5),
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	someThingsHaveChangedLittle: {
		text: "Some things have changed little -- artists still sing the same sort of pop-y love songs",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			// TODO: fill in
			selectedSongs: [
				"Roses Are Red (My Love)",
				"Perfect",
				"All Of Me",
				"Hold Me, Thrill Me, Kiss Me",
				"Kiss Me",
				"Kiss Me More",
				"('til) I Kissed You",
				"Then He Kissed Me"
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	someThingsHaveChangedALot: {
		text: "... but, in other ways, things have changed a ton.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			// TODO: fill in
			selectedSongs: ["Come Softly To Me", "WAP"]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	isTheLoveSongDying: {
		text: "It raises a question: Is the love song dying?",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},

	// BODY
	//
	welcomeToThe60s: {
		text: "Welcome to the late 50s and 60s, with artists like Elvis Presley, The Beatles, and The Supremes.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			performerSearchStrings: ["Elvis Presley", "The Beatles", "The Supremes"],
			timeRange: {
				startYear: 1958,
				endYear: 1969
			}
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	loveSongsAndSerenades: {
		text: `These artist thrived on songs that answered a simple question: "I love you, do you love me?": For example, "Serenades" (yes) and "Longing & Heartbreak" (no)`,
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: ["Serenade", "Longing & Heartbreak"],
			timeRange: {
				startYear: 1958,
				endYear: 1969
			}
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	courtshipAndAntisipation: {
		text: `... and also songs about the early stages of that question: "Courtship & Anticipation" (let's find out!)`,
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: ["Courtship & Anticipation"],
			timeRange: {
				startYear: 1958,
				endYear: 1969
			}
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	}

	// CONCLUSION
};

export const storySteps = [
	// Intro: is the love song dying?
	steps.opening,
	steps.someThingsHaveChangedLittle,
	steps.someThingsHaveChangedALot,
	steps.isTheLoveSongDying,
	// Body: moving chronilogically through time, highlighting specific songs, artists, types of love songs
	// 60s
	steps.welcomeToThe60s,
	steps.loveSongsAndSerenades,
	steps.courtshipAndAntisipation

	// Conclusion
];

export const currentStoryStepIndex = writable(0);

export const currentStoryStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => storySteps[$currentStoryStepIndex]
);
