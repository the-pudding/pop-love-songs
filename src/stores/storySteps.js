import { derived, get, writable } from "svelte/store";
import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS,
	GENDER_CONSTANTS,
	LOVE_SONG_TYPES
} from "$data/data-constants.js";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data.js";
import {
	fractionOfScreenFactory,
	getXPositionFromTime,
	getYPositionInSnakeChart
} from "./forcePositionOptions-helper.js";

// TODO: probably we'll overwrite this whole thing for the final. TEMP, just hardcoded for the demo
export const FIRST_STEP_TO_SHOW_SIDE_BAR = 3;

const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
	selectedPerformers: [],
	selectedGenders: [],
	selectedSongs: [],
	timeRange: {
		startYear: MIN_YEAR,
		endYear: MAX_YEAR
	},

	columnsToFilterVisibilityOn: [],
	visibleButNotSelectedLoveSongTypes: [],

	typesTreatedAsNonLoveSongs: []
};

const VISUAL_ENCODING_BLANK_STATE = {
	calculateXForcePosition: getXPositionFromTime,
	calculateYForcePosition: getYPositionInSnakeChart,
	// TODO: just to get to a prototype, their may be more clever ways to derive these:
	showAggregateSnakeChart: false,
	showBubbleChart: true
};

const newSteps = {
	// Intro: Is Boomer Bob right that the love song is dying?

	allTheBillboardHitsInAMonoChromeCluster: {
		text: "If you look at the Billboard Top 10 from 1959-2023 (each buble is a song, sized by its popularity & tenure on the top 10)...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.7, 0.3),
			calculateYForcePosition: fractionOfScreenFactory(0.7, 0.3)
		}
	},
	highlightSerenadesWithinCluster: {
		text: "... you'll see tons of what you might call Serenades: your classic, unambiguous love songs.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.7, 0.3),
			calculateYForcePosition: fractionOfScreenFactory(0.7, 0.3)
		}
	},
	showJustSerenadeCluster: {
		text: "But, despite their total prevelence, a lot of people, especially Boomers, think that these days the love song is dying.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: fractionOfScreenFactory(0.7, 0.3),
			calculateYForcePosition: fractionOfScreenFactory(0.7, 0.3)
		}
	},
	serenadesAreIndeedDying: {
		text: "And, if you spread Serenades from 1959-2023, they are indeed declining...",
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
	serenadesPeakedInThe90s: {
		text: "Serenades peaked in popularity in the 90s with hits like 'I'll make love to you' by Boyz II Men...",
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
		text: "But a few artists like Biebs & T-Swift keep them alive today [see side panel]. With the Serenade dropping from almost 1 in 4 songs in the 60s to just 1 in 10 today, love songs *do* seem to be on their death bed...",
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
	}
	// What counts as love song?
	// Remaining Boomer-Bob-friendly types:
	// Expansive-mode
	// Explore mode
};

const steps = {
	thisIsAHitSong: {
		text: "This is a hit song. It spent 11 weeks on the Billboard Top 10 [you can use arrow keys to advance]",
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
		text: "This is a song that was listed on Billboard Top 10 for even longer: 57 weeks.",
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
		text: "Pop artists love these heartfelt tributes to their loved ones...",
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
		text: "... just look at the sheer spread of Serenades in the Billboard Top 10 from 1959-2023!",
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
	whatCountsAsAloveSong: {
		text: "But first, what counts as a love song?",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: ["Love Song"],
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [
				SONG_DATA_COLUMNS_ENUM.song,
				SONG_DATA_COLUMNS_ENUM.love_song_sub_type
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5)
		}
	},
	definingSerenade: {
		text: "Let's start with the simplest definition: the singer loves someone, and they're loved back. This is a Serenade.",
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
		// TEMP: for demo
		loveSongTypeDefinitionImage: "serenade"
	},

	// Body:
	serenadesPeakedInThe90s: {
		text: "Serenades peaked in popularity in the 90s with hits like 'I'll make love to you' by Boyz II Men...",
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
		text: "But a few artists like Biebs & T-Swift keep them alive today [see side panel]. With the Serenade dropping from almost 1 in 4 songs in the 60s to just 1 in 10 today, love songs *do* seem to be on their death bed...",
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

	definingLongingAndHeartbreak: {
		text: "But is the Serenade the only form of love song? For example, what if you love someone... and they *don't* love you back? Let's name these songs Longing & Heartbreak.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade
				// LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		loveSongTypeDefinitionImage: "longing-&-heartbreak"
	},
	longingAndHeartbreakOverview: {
		text: "Longing & Heartbreak is almost as popular as the Serenade, and even has surpassed it in the 2020s, thanks in large part to Blinding Lights by The Weeknd.",
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
	longingAndHeartbreakTopArtists: {
		text: "But top artists skew old-school [see side panel]: Taylor Swift & Mariah Carey are virtually the only top artist still making these tearful hits (or, in some cases, still alive!)",
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
	longingAndHeartbreakMakeItWorse: {
		text: "Does expanding to include Heartbreak & Longing songs reveal a love song less in decline? Au contraire! Added to Serenades, love songs have now dropped 22% since the 60s!",
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

	definingCourtship: {
		text: "But maybe we're missing songs? How about when you love someone, and it might become something more? Let's call these Courtship & Anticipation.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
				// LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		loveSongTypeDefinitionImage: "courtship-&-anticipation"
	},
	introducingCourtship: {
		text: "These songs stretch from The Beatles' 'I Want to Hold Your Hand' to Carly Rae Jepsen's 'Call Me Maybe'...",
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
		text: "But the popularity of Courtship & Anticipation songs has remained steady over the years, neither bolstering nor hurting the broader love song category as a whole.",
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
		text: "The Boomers seem right: the love song is dying. Except... perhaps we can explore a broader definition of love? Perhaps there are love song types that often blur the lines?",
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
	definingItsComplicated: {
		text: "Sometimes a romantic relationship isn't squarely thriving or over. Sometimes... It's Complicated.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
				// LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		loveSongTypeDefinitionImage: "its-complicated"
	},
	itsComplicatedDetail: {
		text: "It's Complicated started from the bottom, now it's here. Really here: it dominated the 00s and 10s, reshaping the love song landscape.",
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

	definingGoodRiddance: {
		text: "Good Riddance is Longing & Heartbreak, but with a bite. It's the angsty side of love.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated
				// LOVE_SONG_TYPE_CONSTANTS.goodRiddance
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		loveSongTypeDefinitionImage: "good-riddance"
	},
	introducingGoodRiddance: {
		text: "Good Riddance has gotten bolder: Dion's 'Runaround Sue' (1962) ran a good distance to bring us to Olivia Rodrigo's 2021 'Good 4 U'.",
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
		text: "Women are hugely dominant here (especially compared to the rest of pop hits, where they are often underrepresented)...",
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

	definingLoveSongForTheSelf: {
		text: "Even more of a female-led type, Love Song for the Self is like a Serenade... but directed back at the speaker themselves. Though it's not typically written *to* a lover, it's almost always written *in reaction* to romantic rejection.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance
				// LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
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
		},
		loveSongTypeDefinitionImage: "love-song-for-the-self"
	},
	womenDominateLoveSongForTheSelf: {
		text: "Woman almost single-handedly created Love Song for the Self [toggle the gender filter to see!]. Think 'Born This Way' or 'thank u, next'.",
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
		text: "This type arguably came into its own at the turn of the millennium, with mega hits by TLC and Destiny's Child",
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

	definingSexualConquest: {
		text: "Finally, blurring the lines between courtship and romance (and perhaps love and lust), we have Sexual Conquest.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
				// LOVE_SONG_TYPE_CONSTANTS.sexualConquest
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
		},
		loveSongTypeDefinitionImage: "sexual-conquest"
	},

	introducingSexualConquest: {
		text: "It won't surprise anyone Sexual Conquest has risen in popularity in recent decades, lead by artists like Nicki Minaj and Drake. It went so far as to dethrone Serenades in the 2000s.",
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
		text: "Ok, it's time to zoom out and answer our original question: is the love song dying? (But first, lets add non-love songs (in gray) to get the complete picture of where love songs stand within every single Top 10 hit from 1959-2023...)",
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
		text: "Ok: so, if you accept this broader view of love songs, we have our answer: the love song is just as strong as it ever was (>1% change from the 60s!) In fact, love songs today are arguably more alive, encompassing more of the complexity of romance.",
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
		text: "... that is, *if* you accept these love song definitions. But you don't need to! You decide: use the filters to tell *us* how the love song is doing [the % change score will update with filters]... Enjoy!",
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
	// LATEST STORY:

	// Intro: Is Boomer Bob right that the love song is dying?
	newSteps.allTheBillboardHitsInAMonoChromeCluster,
	newSteps.highlightSerenadesWithinCluster,
	newSteps.showJustSerenadeCluster,
	newSteps.serenadesAreIndeedDying,
	newSteps.serenadesPeakedInThe90s,
	newSteps.aFewArtistsKeepThemAliveToday,

	// What counts as love song?
	// Remaining Boomer-Bob-friendly types:
	// Expansive-mode
	// Explore mode

	// OLD STORY (JUST KEPT AROUND FOR REFERENCE:)
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
	steps.whatCountsAsAloveSong,
	steps.definingSerenade,

	// Body: classic love song types
	steps.serenadesPeakedInThe90s,
	steps.aFewArtistsKeepThemAliveToday,

	steps.definingLongingAndHeartbreak,
	steps.longingAndHeartbreakOverview,
	steps.longingAndHeartbreakTopArtists,
	steps.longingAndHeartbreakMakeItWorse,

	steps.definingCourtship,
	steps.introducingCourtship,
	steps.courtshipDetail,

	// Transition into broader love song types:
	steps.transitionIntoBroaderLoveSongTypes,

	steps.definingItsComplicated,
	steps.itsComplicatedDetail,
	steps.kikiDoYouLoveMe,

	steps.definingGoodRiddance,
	steps.introducingGoodRiddance,
	steps.goodRiddanceDetail,
	steps.goodRiddanceArtists,

	steps.definingLoveSongForTheSelf,
	steps.womenDominateLoveSongForTheSelf,
	steps.whenLoveSongForTheSelfCameIntoItsOwn,

	steps.definingSexualConquest,
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

export const typesTreatedAsNonLoveSongs = derived(
	[currentStoryStep],
	([$currentStoryStep]) =>
		$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs
);
