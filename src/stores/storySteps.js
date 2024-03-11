import { derived, writable } from "svelte/store";
import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS,
	GENDER_CONSTANTS
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
	callingOutAFewSerenades: {
		text: "Pop artists love these feel-goody, love-drenched tunes...",
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
			columnsToFilterVisibilityOn: [
				SONG_DATA_COLUMNS_ENUM.love_song_sub_type,
				SONG_DATA_COLUMNS_ENUM.song
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.5),
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	allTheSerenadesInAClutser: {
		text: "... like *really* love them...",
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
		text: "... just look at all the sheer spread of Serenades in the Billboard Top 10 from 1959-2023",
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
	butSerenadesAreDeclining: {
		text: "But Serenades are declining: they're down 11% from the 60s vs the last 10 years [see side panel], which begs the question...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		},
		showLoveSongChangeOverTime: true
	},
	isTheLoveSongDyingTitleStep: {
		text: "... is the love song dying? (some people think so) [show screenshots of Boombers bemoaning the death of love songs]",
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

	// Transition:
	definingSerenade: {
		text: "But first, what counts as a love song? The simplest definition: you love someone, and they love you back. This is what we called a Serenade.",
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
		},
		// TEMP: for demo
		loveSongTypeDefinitionImage: "serenade"
	},

	// Body:
	serenadesPeakedInThe90s: {
		text: "Let's start with Serenades: where both parties love each other. They peaked in popularity the 90s with hits like 'I'll make love to you' by Boyz II Men",
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
		},
		showLoveSongChangeOverTime: true
	},
	aFewArtistsKeepThemAliveToday: {
		text: "Only a few artists like Biebs & T-Swift keep them alive today [see side panel]. With the Seranade dropping from almost 1 in 4 songs in 60s to just 1 in 10 today, love songs seem on their death bed...",
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
		},
		showLoveSongChangeOverTime: true
	},
	introducingLongingAndHeartbreak: {
		text: "... so lets expand to relationships where love isn't so clearly reciprocated: the Heartbreak & Longing type. Egads! If these are the only love songs, then love songs have now dropped 22% since the 60s!",
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
		},
		showLoveSongChangeOverTime: true
	},
	longingAndHeartbreakDetails: {
		text: "This makes sense when you look at top artists [see side panel]: Taylor Swift is the only active (or sometimes, even, living!) artist!",
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
		text: "Will adding the 'You love them, they *might* love you' type -- Courtship & Anticipation -- help keep the love song alive? Nope!",
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
		},
		showLoveSongChangeOverTime: true
	},
	courtshipDetail: {
		text: "Courtship & Anticipation have remained steady over the years [see side panel], neither bolstering nor hurting the broader love song category as a whole.",
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
		},
		showLoveSongChangeOverTime: true
	},

	// Transition into broader love song types:
	transitionIntoBroaderLoveSongTypes: {
		text: "Now shift into the less Boomer-ish love song types... love song types that often blur the lines...",
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
		},
		loveSongTypeDefinitionImage: "serenade"
	},
	introducingItsComplicated: {
		text: "Sometimes a romantic relatinoship isn't squarely thriving or over. Sometimes... It's Complicated.",
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
	itsComplicatedDetail: {
		text: "It's Complicated started from the bottom, now it's here. Really here: it domainted 00-10s, reshaping the love song landscape.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	kikiDoYouLoveMe: {
		text: "Drake alone has 11 top 10 hits. Kiki may not love him, but *he's* definitely riding It's Complicated hard.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedPerformers: ["Drake"],
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			]
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
		text: "Good Riddance builds out the angsty side of love",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
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
	goodRiddanceDetail: {
		text: "Women are hugely dominant here (compared to the rest of pop hits)...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedGenders: [GENDER_CONSTANTS.female],
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	goodRiddanceArtists: {
		text: "... with Barbra Streisand well ahead her time: she beat Kelly Clarksen and Mariah Carey by decades.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedPerformers: [
				"Barbra Streisand",
				"Kelly Clarkson",
				"Mariah Carey"
			],
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},

	womenDominateLoveSongForTheSelf: {
		text: "Even more of a female-led type, Love Song for the Self is typified by reacting to struggle or rejection with self-affirmation",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedGenders: [GENDER_CONSTANTS.female],
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},
	whenLoveSongForTheSelfCameIntoItsOwn: {
		text: "This type arguably came into its own at the turn of the mellinium, with mega hits by TLC and Destiny's Child",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedPerformers: ["TLC", "Destiny's Child"],
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},

	introducingSexualConquest: {
		text: "Finally, the rising star & likely primary target of Boomer hate: Sexual Conquest, which went so far as to dethrone Serenades in the  2000s.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf,
				LOVE_SONG_TYPE_CONSTANTS.sexualConquest
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},

	addInNonLoveSongsInGray: {
		text: "Ok, it's time to zoom out and answer our original question: is the love song dying? (But first, lets add in non-love songs to complete the picture...)",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		}
	},

	theLoveSongIsActuallyRising: {
		text: "Ok: so, if you accept this broader view of love songs, we have our answer: the love song is just as strong as it ever was, and in fact stretches to encompass more of the complexity of romance than it ever has before!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongChangeOverTime: true
	},

	youDecide: {
		text: "... that is, *if* you accept this definition. But you don't need to! You decide: use the filters to tell *us* how the love song is doing... Enjoy!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongChangeOverTime: true
	}
};

export const storySteps = [
	// Intro:
	steps.thisIsAHitSong,
	steps.thisSongWasRankedForEvenLonger,
	steps.thisSongIsASerenade,
	steps.callingOutAFewSerenades,
	steps.allTheSerenadesInAClutser,
	steps.allTheSerenadesInOverTime,
	steps.butSerenadesAreDeclining,
	steps.isTheLoveSongDyingTitleStep,

	// Transition & definition:
	steps.definingSerenade,

	// Body: classic love song types
	steps.serenadesPeakedInThe90s,
	steps.aFewArtistsKeepThemAliveToday,

	steps.introducingLongingAndHeartbreak,
	steps.longingAndHeartbreakDetails,

	steps.introducingCourtship,
	steps.courtshipDetail,

	// Transition into broader love song types:
	steps.transitionIntoBroaderLoveSongTypes,
	steps.introducingItsComplicated,
	steps.itsComplicatedDetail,
	steps.kikiDoYouLoveMe,

	steps.introducingGoodRiddance,
	steps.goodRiddanceDetail,
	steps.goodRiddanceArtists,

	steps.womenDominateLoveSongForTheSelf,
	steps.whenLoveSongForTheSelfCameIntoItsOwn,

	steps.introducingSexualConquest,

	// Conclusion:
	steps.addInNonLoveSongsInGray,
	steps.theLoveSongIsActuallyRising,

	steps.youDecide
];

export const currentStoryStepIndex = writable(0);

export const currentStoryStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => storySteps[$currentStoryStepIndex]
);
