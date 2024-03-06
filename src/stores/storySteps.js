import { derived, writable } from "svelte/store";
import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS
} from "$data/data-constants.js";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data.js";
import {
	fractionOfScreenFactory,
	getXPositionFromTime,
	getYPositionInSnakeChart
} from "./forcePositionOptions-helper.js";

const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
	selectedPerformers: [],
	selectedGenders: [],
	selectedGenres: [],
	selectedSongs: [],

	columnsToFilterVisibilityOn: [],
	visibleButNotSelectedLoveSongTypes: [],

	timeRange: {
		startYear: MIN_YEAR,
		endYear: MAX_YEAR
	}
};

const VISUAL_ENCODING_BLANK_STATE = {
	calculateXForcePosition: getXPositionFromTime,
	calculateYForcePosition: getYPositionInSnakeChart // TODO: udpate to be snake chart by default
};

const steps = {
	thisIsAHitSong: {
		text: "This is a hit song. [11 weeks on the Billboard Top 10]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: ["Let It Be"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.song]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.5),
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	thisSongWasRankedForEvenLonger: {
		text: "This is a song that was listed on Billboard Top 10 for even longer. [57 weeks]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: ["Let It Be", "Blinding Lights"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.song]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.5),
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	thisSongIsASerenade: {
		text: "This Top 10 hit is a love song -- specifically a Serenade...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: ["Let It Be", "Blinding Lights", "Bubbly"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.song]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.5),
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	allTheSerenadesInAClutser: {
		text: "We've been singing Serenades for a long time...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.5),
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	allTheSerenadesInOverTime: {
		text: "... here are all the Billboard Top 10 Serenades spread from 1959 to through 2022",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	callingOutAFewSerenades: {
		text: "You probably recognize quite a few...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			selectedSongs: [
				"Roses Are Red (My Love)",
				"Perfect",
				"All Of Me",
				"Hold Me, Thrill Me, Kiss Me",
				"Kiss Me",
				"Kiss Me More",
				"('til) I Kissed You",
				"Then He Kissed Me",
				"Bubbly",
				"Like A Virgin"
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	butSerenadesAreDeclining: {
		text: "But as a whole, Serenades are declining, which begs the question...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	isTheLoveSongDyingTitleStep: {
		text: "... is the love song dying? (some people think so) [show Boomber Bob screenshots]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},

	// Body:
	serenadesPeakedInThe90s: {
		text: "Serenades: songs where both parties love each other. They peaked in popularity the 90s with [see side panel]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			timeRange: {
				startYear: MIN_YEAR,
				endYear: 2000
			},
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	aFewArtistsKeepThemAliveToday: {
		text: "Only a few artists like Biebs & T-Swift keep them alive today [see side panel]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			timeRange: {
				startYear: 2001,
				endYear: MAX_YEAR
			},
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	introducingLongingAndHeartbreak: {
		text: "But there are also songs where love isn't so easy: Heartbreak & Longing...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	longingAndHeartbreakDetails: {
		text: "Looking at just Heartbreak & Longing, Mariah Care and Taylor Swift reign this type...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	introducingCourtship: {
		text: "... or where love is still sprouting: Courtship & Antisipation...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	courtshipDetail: {
		text: "The top artists are [see side panel]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	introducingItsComplicated: {
		text: "... or where love has become complicated: It's Complicated...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	introducingSexualConquest: {
		text: "... or, as the younger generations pioneered, where it gets steamy: Sexual Conquest...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.sexualConquest
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	introducingGoodRiddance: {
		text: "... sometimes, its just a Good Riddance (ask Kelly Clarkson)...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				// LOVE_SONG_TYPE_CONSTANTS.serenade,
				// LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				// LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				// LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				// LOVE_SONG_TYPE_CONSTANTS.sexualConquest,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	introducingPlatonicAndLoveSongForTheSelf: {
		text: "... and finally Love Song for the Self and Platonic Love...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				// LOVE_SONG_TYPE_CONSTANTS.serenade,
				// LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				// LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				// LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				// LOVE_SONG_TYPE_CONSTANTS.sexualConquest,
				LOVE_SONG_TYPE_CONSTANTS.platonicLove,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	}
};

export const storySteps = [
	// Intro:
	steps.thisIsAHitSong,
	steps.thisSongWasRankedForEvenLonger,
	steps.thisSongIsASerenade,
	steps.allTheSerenadesInAClutser,
	steps.allTheSerenadesInOverTime,
	steps.callingOutAFewSerenades,
	steps.butSerenadesAreDeclining,
	steps.isTheLoveSongDyingTitleStep,

	// Body:
	steps.serenadesPeakedInThe90s,
	steps.aFewArtistsKeepThemAliveToday,

	steps.introducingLongingAndHeartbreak,
	steps.longingAndHeartbreakDetails,

	steps.introducingCourtship,
	steps.courtshipDetail,

	steps.introducingItsComplicated,
	steps.introducingGoodRiddance,
	steps.introducingSexualConquest,
	steps.introducingPlatonicAndLoveSongForTheSelf,
	steps.introducingPlatonicAndLoveSongForTheSelf

	// Conclusion:
];

export const currentStoryStepIndex = writable(0);

export const currentStoryStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => storySteps[$currentStoryStepIndex]
);
