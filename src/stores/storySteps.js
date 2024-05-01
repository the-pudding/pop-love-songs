import { derived, writable } from "svelte/store";
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
import {
	selectedLoveSongTypes,
	visibleButNotSelectedLoveSongTypes
} from "./searchAndFilter.js";

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
	showAggregateSnakeChart: false
	// TODO: we actually want to drop this second value, since we'll never show both simultaneously
};

const steps = {
	// Intro: Is Boomer Bob right that the love song is dying?

	allTheBillboardHitsInAMonoChromeCluster: {
		text: "If you look at the Billboard Top 10 from 1959-2023 (each buble is a song, sized by its popularity & tenure on the top 10)... [to advance, tap side arrows buttons or use keyboard arrow keys]",
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
		text: "And, if you spread Serenades from 1959-2023, they are indeed declining... [DEV NOTE: hit 'd' on keyboard to open/close filters & stats]",
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
		text: "But only a few artists like Biebs & T-Swift keep them alive today [see side panel]. With the Serenade dropping from almost 1 in 4 songs in the 60s to just 1 in 10 today, love songs *do* seem to be on their death bed...",
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
	anAggSnakeChartMakesBoomerBobSeemRight: {
		text: "Comparing Serenades in aggregate against all other songs, we have to ask: is Boomer Bob right about love songs dying?",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},

	// What counts as love song?
	butWeWillTakeAMoreExpansiveView: {
		text: "Not quite: we think Boomer Bob has too narrow of a view of love. Sure, Serenades have declined. But what about other songs? Is 'Buy U A Drank' by T-Pain a love song? What about 'I Will Always Love You' by Whitney Houston? 'WAP'? We'll take a more expansive view.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedSongs: [
				"Buy U A Drank (Shawty Snappin')",
				"I Will Always Love You",
				"WAP"
			],
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},
	whyWeCare: {
		text: "[Why MJia & Dmo care about countering Boomer Bob's view]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},
	introTheTypeGrid: {
		text: "[here's how we'll classify love song types. here's Serenade, here's Longing & Heartbreak]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		loveSongTypeDefinitionImage: "longing-&-heartbreak"
	},

	// Remaining Boomer-Bob-friendly types:
	introducingLongingAndHeartbreak: {
		text: "Longing & Heartbreak is typified by songs like X, Y and Z. [we'll directly annotate specific bubbles on screen with song snippet, photos of artists, etc]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},

	longingAndHeartbreakComparedToSerenade: {
		text: "Longing & Heartbreak surpassed Serenades in the 2020s, thanks in large part to Blinding Lights by The Weeknd. Note: for each decade, we'll vertically sort the love song types by popularity (which is why Hearbreak jumps above Serenade in the 2020s).",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
					].includes(t)
			),
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},

	longingAndHeartbreakDoNotTipTheScales: {
		text: "Does expanding to include Heartbreak & Longing songs keep love songs alive? Au contraire! Added to Serenades, love songs have now dropped 22% since the 60s!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},
	// Courtship
	definingCourtship: {
		text: "But we're just getting started... How about when you love someone, and it *might* become something more? Let's call these Courtship & Anticipation.",
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
		text: "These songs stretch from The Beatles' 'I Want To Hold Your Hand' to Carly Rae Jepsen's 'Call Me Maybe'...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},

	courtshipHasNoEffect: {
		text: "But the popularity of Courtship & Anticipation songs has remained steady over the years, neither bolstering nor hurting the broader love song category as a whole.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},

	// Expansive-mode

	// its complicated
	letsGoBeyondBoomerBob: {
		text: "But we think love songs go beyond Boomer Bob's narrow view. Let's explore love songs that pull in more of romance's complexity, starting with: It's Complicated, which straddles stable & painful relationships.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		loveSongTypeDefinitionImage: "its-complicated"
	},

	definingItsComplicated: {
		text: "Sometimes a romantic relationship isn't squarely thriving or over. Sometimes... It's Complicated. It straddles stable & painful relationships.",
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
	introducingItsComplicated: {
		text: "No one does It's Complicated like Drake [we'll annotate him], featured in *11* of these hits alone. You might also think of X & Y songs, too [also will be annotated].",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.itsComplicated],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	itsComplicatedDetail: {
		text: "It's Complicated hit its stride in the 00s and 10s, surpassing Courtship & Anticipation as well as Longing & Heartbreak.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			visibleButNotSelectedLoveSongTypes: LOVE_SONG_TYPES.filter(
				(t) => ![LOVE_SONG_TYPE_CONSTANTS.itsComplicated].includes(t)
			),
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
						LOVE_SONG_TYPE_CONSTANTS.itsComplicated
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		}
	},
	itsComplicatedDoesNotTipTheScales: {
		text: "But even with It's Complicated, love songs are still in decline",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
						LOVE_SONG_TYPE_CONSTANTS.itsComplicated
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},

	definingGoodRiddance: {
		text: "But we're not done. Let's look at two more modern & female-pioneered types in terms, starting with: Good Riddance, which is like Longing & Heartbreak, but with a bite. It's the angsty side of love.",
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
		text: "Good Riddance, ranging from Dion's 'Runaround Sue' (1962) to Olivia Rodrigo's 2021 'Good 4 U', really established itself starting in the 2000s with Cher's 'Believe'...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.goodRiddance],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	goodRiddanceDetail: {
		text: "Female & gender non-conforming artists dominate Good Riddance. Barbra Streisand paved the way for heavy hitters like Kelly Clarksen and Mariah Carey.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedGenders: [
				GENDER_CONSTANTS.female,
				GENDER_CONSTANTS["gender non-conforming"]
			],
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.goodRiddance],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},

	// Love song for the self
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
	introducingLoveSongForTheSelf: {
		text: "Love Song for the Self hit its stride with TLC & Destiny's Child in the early 2000s. Think 'Fergalicious' or Ariana Grande's 'thank u, next' in this female-domanated type.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	didLoveSongForTheSelfTipTheScales: {
		text: "But even with Good Riddance & Love Song for the Self, love songs are still in decline (though less than before)",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
						LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
						LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
						LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
					].includes(t)
			)
			// visibleButNotSelectedLoveSongTypes: [
			// 	LOVE_SONG_TYPE_CONSTANTS.serenade,
			// 	LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
			// 	LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
			// 	LOVE_SONG_TYPE_CONSTANTS.itsComplicated
			// ]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},

	definingSexualConquest: {
		text: "But we've got one love song type left: blurring the lines between courtship and romance (and perhaps love and lust), we have Sexual Conquest.",
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
		text: "Nicki Minaj and Drake feature in the most songs in category, with their hits like WAP and Way 2 Sexy.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.sexualConquest],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		}
	},
	sexualConquestInContext: {
		text: "As Boomers bemoan, Sexual Conquest has risen in popularity in recent decades. It even went so far as to dethrone Serenades in the 2000s.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			visibleButNotSelectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.serenade,
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
				LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
				LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
				LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
				// LOVE_SONG_TYPE_CONSTANTS.sexualConquest
			],
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.sexualConquest]
			// columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		}
	},

	addInNonLoveSongsInGray: {
		text: "Ok, it's time to zoom out and answer our original question: is the love song dying? Let's look at the aggregate in 3, 2...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		}
	},

	theLoveSongIsActuallyRising: {
		text: "... and we have our answer: the love song is just as strong as it ever was (>1% change from the 60s!) In fact, love songs today are arguably more alive, encompassing more of the complexity of romance.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	},

	// Explore mode
	youDecide: {
		text: "... that is, *if* you accept these love song definitions. But you don't need to! You decide: use the filters to tell *us* how the love song is doing: the % change score will update with filters [hit 'd' to open/close filters]... Enjoy!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: Object.values(LOVE_SONG_TYPE_CONSTANTS),
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChangeOverTime: true
	}
};

export const storySteps = [
	// LATEST STORY:

	// Intro: Is Boomer Bob right that the love song is dying?
	steps.allTheBillboardHitsInAMonoChromeCluster,
	steps.highlightSerenadesWithinCluster,
	steps.showJustSerenadeCluster,
	steps.serenadesAreIndeedDying,
	steps.serenadesPeakedInThe90s,
	steps.aFewArtistsKeepThemAliveToday,
	steps.anAggSnakeChartMakesBoomerBobSeemRight,

	// What counts as love song?
	steps.butWeWillTakeAMoreExpansiveView,
	steps.whyWeCare,
	steps.introTheTypeGrid,

	// Remaining Boomer-Bob-friendly types:
	steps.introducingLongingAndHeartbreak,
	steps.longingAndHeartbreakComparedToSerenade,
	steps.longingAndHeartbreakDoNotTipTheScales,

	steps.definingCourtship,
	steps.introducingCourtship,
	steps.courtshipHasNoEffect,

	// Expansive-mode
	steps.letsGoBeyondBoomerBob,

	steps.introducingItsComplicated,
	steps.itsComplicatedDetail,
	steps.itsComplicatedDoesNotTipTheScales,

	steps.definingGoodRiddance,
	steps.introducingGoodRiddance,
	steps.goodRiddanceDetail,

	steps.definingLoveSongForTheSelf,
	steps.introducingLoveSongForTheSelf,
	steps.didLoveSongForTheSelfTipTheScales,

	steps.definingSexualConquest,
	steps.introducingSexualConquest,
	steps.sexualConquestInContext,

	// Conclusion:
	steps.addInNonLoveSongsInGray,
	steps.theLoveSongIsActuallyRising,

	// Explore mode
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
