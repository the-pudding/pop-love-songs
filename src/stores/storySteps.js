import { derived, writable } from "svelte/store";
import previous from "./previous";
import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS,
	GENDER_CONSTANTS,
	LOVE_SONG_TYPES
} from "$data/data-constants.js";
import { MAX_DATE, MIN_DATE } from "$data/songs-data.js";
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
	timeRange: {
		startYear: MIN_DATE,
		endYear: MAX_DATE
	},

	columnsToFilterVisibilityOn: [],
	visibleButNotSelectedLoveSongTypes: [],

	typesTreatedAsNonLoveSongs: []
};

const VISUAL_ENCODING_BLANK_STATE = {
	onLoadUseRandomInitialPositions: false,
	calculateXForcePosition: getXPositionFromTime,
	calculateYForcePosition: getYPositionInSnakeChart,
	forceXStrength: 5, // it is FAR more important that the bubble is accurate to the time encoding
	forceYStrength: 2, // the y position can be a bit more flexible
	restartBubblesOnAdvanceInto: true,
	restartBubblesOnReturnInto: true,

	showAggregateSnakeChart: false,

	// Note: currently just using song name, which could cause collissions, but since its manually set, I'll cross that bridgfe if we come to it.
	songAnnotations: []
};

const steps = {
	// Intro: Is Boomer Bob right that the love song is dying?

	allTheBillboardHitsInAMonoChromeCluster: {
		text: "If you look at the Billboard Top 10 from 1959-2023 (each bubble represents a song, sized according to its popularity & length of time in the Top 10)... [to advance, click side arrow buttons or use keyboard arrow keys]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			onLoadUseRandomInitialPositions: true,
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			restartBubblesOnReturnInto: false,
			forceXStrength: 0.1,
			forceYStrength: 0.1
		}
	},
	highlightSerenadesWithinCluster: {
		text: "... you'll see tons of what you might call Serenades: songs that directly express a feeling of love and/or devotion for someone. Think 'No One' by Alicia Keys or 'Perfect' by Ed Sheeran. With swelling strings or sentimental guitar, it's the stuff you dance to at prom or a wedding... How sweet!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			onLoadUseRandomInitialPositions: true,
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			restartBubblesOnAdvanceInto: false,
			forceXStrength: 0.1,
			forceYStrength: 0.1
		}
	},
	showJustSerenadeCluster: {
		text: "But, despite their prevalence, a lot of people, especially those of older generations like Baby Boomers, think that the love song is dying.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			onLoadUseRandomInitialPositions: true,
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			forceXStrength: 0.2,
			forceYStrength: 0.2
		},
		showBoomerBobImages: true
	},
	serenadesAreIndeedDying: {
		text: "If you spread the Serenades from 1959-2023, they are indeed declining, both in total count and total popularity...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			restartBubblesOnReturnInto: false,
			forceXStrength: 1,
			forceYStrength: 0.5
		}
	},
	serenadesPeakedInThe90s: {
		text: "Serenades peaked in popularity in the 90s with hits like 'I'll Make Love to You' by Boyz II Men...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			timeRange: {
				startYear: MIN_DATE,
				endYear: 2000
			},
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			restartBubblesOnAdvanceInto: false,
			restartBubblesOnReturnInto: false,
			forceXStrength: 1,
			forceYStrength: 0.5,
			songAnnotations: [{ song: "I'll Make Love To You", year: 1994 }]
		}
	},
	aFewArtistsKeepThemAliveToday: {
		text: "... then they waned: today, only a few artists like Biebs & T-Swift champion Serenades.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			timeRange: {
				startYear: 2001,
				endYear: MAX_DATE
			},
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			restartBubblesOnAdvanceInto: false,
			restartBubblesOnReturnInto: true,
			forceXStrength: 1,
			forceYStrength: 0.5,
			songAnnotations: [
				{ song: "Love Story", year: 2008 },
				{ song: "Intentions", year: 2020 }
			]
		}
	},
	anAggSnakeChartMakesBoomerBobSeemRight: {
		text: "When we compare the proportion of love songs to all other pop hits, we see a striking, nearly 50% drop since the 60s. So, we have to ask: is Boomer Bob right? Are love songs dying?",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			forceYStrength: 0.5, // PREP FOR NEXT SLIDE: I want the bubbles to spread to fill their respective regions more similarly to the snake
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},

	// What counts as love song?
	butWeWillTakeAMoreExpansiveView: {
		text: "Not quite: we think Boomer Bob has too narrow of a view of love. Sure, Serenades have declined. But what about other songs? What about 'I Will Always Love You' by Whitney Houston? Is 'Buy U A Drank' by T-Pain a love song? Or 'WAP'? In this piece, we'll take a more expansive view.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnAdvanceInto: false,
			forceYStrength: 0.1, // I want the bubbles to spread to fill their respective regions more similarly to the snake
			songAnnotations: [
				{ song: "Buy U A Drank (Shawty Snappin')", year: 2007 },
				{ song: "I Will Always Love You", year: 1993 },
				{ song: "WAP", year: 2020 }
			]
		}
	},
	whyWeCare: {
		text: "It's easy to just shake our fists and say, 'Kids these days don't value love anymore!' But if, instead, we challenge ourselves to look deeper at love songs -- and romance itself -- we uncover a far more complex (and fascinating) story. A story that will change how you see love in pop music. Let's dive in...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnAdvanceInto: false, // bubble chart isn't changing, leave it as is as snake comes in over the top
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},
	introTheTypeGrid: {
		text: "If we're going to take you deep into love song land, we need a classification system. Earlier we showed you most obvioius form of love songs: Serenades. What typifies these songs (besides sappiness)? The relationship between the subjects: you loves someone, and they love you back! It's the best-case scenario in love.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => ![LOVE_SONG_TYPE_CONSTANTS.serenade].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
		},
		showLoveSongTypeTableWithThisHighlighted: LOVE_SONG_TYPE_CONSTANTS.serenade
	},
	addingHeartbreakToTheGrid: {
		text: "But what happens if you love them, but they just... don't? We can add another row to our table, where we'll name this new type of sad love song: Longing & Heartbreak.",
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
			...VISUAL_ENCODING_BLANK_STATE
		},
		showLoveSongTypeTableWithThisHighlighted:
			LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
	},

	// Remaining Boomer-Bob-friendly types:
	introducingLongingAndHeartbreak: {
		text: "Longing & Heartbreak songs are typified here by songs like Whitney Houston's 'I Will Always Love You' or Rihanna's 'Stay.'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "I Will Always Love You", year: 1993 },
				{ song: "Stay", year: 2013 }
			]
		}
	},

	longingAndHeartbreakComparedToSerenade: {
		text: "Longing & Heartbreak surpassed Serenades in the 2020s, thanks in large part to 'Blinding Lights' by The Weeknd. Note: for each decade, we'll vertically sort the love song types by popularity (which is why Hearbreak jumps above Serenade in the 2020s).",
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
			restartBubblesOnReturnInto: false
		}
	},

	longingAndHeartbreakDoNotTipTheScales: {
		text: "Does expanding to include Heartbreak & Longing reveal that love songs are still alive and well? Not at all! Even with this expanded defintion of love songs, they've have declined just as much since the 60s!",
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
			restartBubblesOnAdvanceInto: false,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},
	// Courtship
	introducingCourtship: {
		text: "But we're just getting started... How about when you love someone, and it *might* become something more? You just spotted someone, your heart is beating fast, and who KNOWS where this thing might lead? Think 'Call Me Maybe' by Carly Rae Jepsen...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Call Me Maybe", year: 2012 },
				{ song: "I Want To Hold Your Hand", year: 1964 }
			]
		}
	},
	definingCourtship: {
		text: "Let's add a new row for romantic possibility, and call these Courtship & Anticipation.",
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
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongTypeTableWithThisHighlighted:
			LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
	},
	courtshipHasNoEffect: {
		text: "The popularity of Courtship & Anticipation songs has remained fairly steady over the years. Their slight uptick in the modern era does little to change the love song's overall decline.",
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
		showLoveSongChange: true
	},

	// Expansive-mode

	// its complicated
	introducingItsComplicated: {
		text: "Ok, so the love song *is* dying, it seems? Not so fast: brace yourself, Boomers, we're about to explore the messier side of romance. To start: what about when a relationship isn't clearly good or bad? You're with someone, but constantly fighting. Maybe you know they're unfaithful, but you still have hope...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.itsComplicated],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Will You Love Me Tomorrow", year: 1961 },
				{ song: "Quit Playing Games (With My Heart)", year: 1997 },
				{ song: "In My Feelings", year: 2018 }
			]
		}
	},
	definingItsComplicated: {
		text: "Truth is, sometimes a romantic relationship straddles both love *and* heartbreak because, well... It's Complicated. Boomers, we see you: these may not be the classic love songs of your youth isn't, so we'll give them their own column.",
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
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongTypeTableWithThisHighlighted:
			LOVE_SONG_TYPE_CONSTANTS.itsComplicated
	},
	itsComplicatedDetail: {
		text: "Popular culture seems to have steadily warmed to the more complex experiences of love. It's Complicated hit its stride in the 00s and 10s, surpassing both Courtship & Anticipation and Longing & Heartbreak.",
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
		text: "Can this angsty genre save the love song? Not quite. We're getting closer, but the 60s still 25% more love songs than the modern era.",
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
		showLoveSongChange: true
	},

	introducingGoodRiddance: {
		text: "But we're not done. What about those songs where the relationship *is* clearly over... but the singer seems grateful it ended? Think Dion's 'Runaround Sue' or Olivia Rodrigo's 'Good 4 U.'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.goodRiddance],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Runaround Sue", year: 1962 },
				{ song: "Survivor", year: 2001 },
				{ song: "Good 4 U", year: 2021 }
			]
		}
	},
	definingGoodRiddance: {
		text: "Meet 'Good Riddance': it's Longing & Heartbreak... with a bite. It's over and wow, did you dodge a bullet! Your ex sucks!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
						LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
						LOVE_SONG_TYPE_CONSTANTS.goodRiddance
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongTypeTableWithThisHighlighted:
			LOVE_SONG_TYPE_CONSTANTS.goodRiddance
	},
	goodRiddanceDetail: {
		text: "Female & gender non-conforming artists dominate Good Riddance. What Barbra Streisand started with 2 hits in the late 70s, Kelly Clarksen and Mariah Carey perfected with a whopping 9 hits between them.",
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
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "No More Tears (Enough Is Enough)", year: 1980 },
				{ song: "Stronger (What Doesn't Kill You)", year: 2011 }
			]
		}
	},
	goodRiddanceDoesNotTipTheScale: {
		text: "But, even with modern hits like Halsey's 'Without You' and GAYLE's oh-so-subtle 'abcdefu', Good Riddance only gives a small bump to the love song category.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation,
						LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
						LOVE_SONG_TYPE_CONSTANTS.goodRiddance
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},

	// Love song for the self

	introducingLoveSongForTheSelf: {
		text: "We've ventured far from the Serenade. But we can go further: think about those songs heartbreak turns love... back onto the OG, yourself? Think: TLC & Destiny's Child in the early 2000s or Miley's 'Flowers'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "I Am Woman", year: 1972 },
				{ song: "Unpretty", year: 1999 },
				{ song: "Thank U, Next", year: 2018 }
			]
		}
	},
	definingLoveSongForTheSelf: {
		text: "Meet  'Love Song for the Self': like a Serenade, but for the self. While it's never written to a lover, it's often written in reaction to romantic rejection -- you don't love me? That's ok, because I do! I'll by *myself* those flowers...",
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
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongTypeTableWithThisHighlighted:
			LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
	},
	didLoveSongForTheSelfTipTheScales: {
		text: "But even with the women-pioneered Good Riddance and Love Song for the Self generes, love songs are still in decline - though much less than before!",
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
		showLoveSongChange: true
	},

	introducingSexualConquest: {
		text: "And it happens we've got one love song type left: songs that get... a little steamy. Think about artists like Nicki Minaj and Drake with their respective hits 'WAP' and 'Way 2 Sexy.'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.sexualConquest],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Physical", year: 1982 },
				{ song: "WAP", year: 2020 },
				{ song: "Way 2 Sexy", year: 2021 }
			]
		}
	},
	definingSexualConquest: {
		text: "These songs blur the lines between courtship and romance, and we'll call them Sexual Confidence.",
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
						LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf,
						LOVE_SONG_TYPE_CONSTANTS.sexualConquest
					].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			calculateYForcePosition: getYPositionInSnakeChart
		},
		showLoveSongTypeTableWithThisHighlighted:
			LOVE_SONG_TYPE_CONSTANTS.sexualConquest
	},
	sexualConquestInContext: {
		text: "As Boomers bemoan, Sexual Confidence has risen in popularity. It even dethroned Serenades in the 2000s! Has lust replaced love? Maybe. More likely, as theorists point, the younger generation sees sex as a *gateway* to love. The first step, not the destination.",
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
		text: "Phew! Take a deep breath: we've finally covered every major love song type in the table (both classic *and* more expansive!) Now it's finally time to zoom out and answer our original question: is the love song dying? In 3, 2...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		}
	},

	theLoveSongIsActuallyRising: {
		text: "... and we have our answer: the love song is just as strong as it ever was (less than a 2% decline since the 60s!) In fact, we'd argue love songs today are *more* alive: they paint a far more vivid, complex, & diverse view of romantic experience.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},

	// trendsWeExplored: {
	// 	text: "Some of the trends we've explored have been: the decline of the Serenade, the rise of the Heartbreak Song and the steady growing popularity of more complex love song types like It's Complicated and Good Riddance. Meanwhile, feel-good genres like Sexual Confidence and Love Song for the Self are lending a distinctly empowering feel to the ol' L-word.",
	// 	searchAndFilterState: {
	// 		...SEARCH_AND_FILTER_BLANK_STATE,
	// 		columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
	// 	},
	// 	visualEncodings: {
	// 		...VISUAL_ENCODING_BLANK_STATE,
	// 		showAggregateSnakeChart: true
	// 	},
	// 	showLoveSongChange: true
	// },
	whatCausedTheseChanges: {
		text: "What caused these changes? Certainly cultural shifted. To a lesser extend, we might be just seeing Billboard's data collection evolve: from tallying record sales in the 60s to, today, counting all 200 times you streamed 'WAP' on Spotify.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},

	// Explore mode
	youDecide: {
		text: "But, ultimately, the status of love songs depends on what *you* count as a love song. So, you decide: add and remove love songs based on your definition, and tell US how the love song is doing! (for true nerds: try the advanced filters via the top bar)",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			columnsToFilterVisibilityOn: [
				SONG_DATA_COLUMNS_ENUM.type_and_gender_list_str
			]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true,
		allowUserToChangeFilters: true
	}
};

const unprocessedStorySteps = [
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
	steps.addingHeartbreakToTheGrid,

	// Remaining Boomer-Bob-friendly types:
	steps.introducingLongingAndHeartbreak,
	steps.longingAndHeartbreakComparedToSerenade,
	steps.longingAndHeartbreakDoNotTipTheScales,

	steps.introducingCourtship,
	steps.definingCourtship,
	steps.courtshipHasNoEffect,

	// Expansive-mode
	steps.introducingItsComplicated,
	steps.definingItsComplicated,
	steps.itsComplicatedDetail,
	steps.itsComplicatedDoesNotTipTheScales,

	steps.introducingGoodRiddance,
	steps.definingGoodRiddance,
	steps.goodRiddanceDetail,
	steps.goodRiddanceDoesNotTipTheScale,

	steps.introducingLoveSongForTheSelf,
	steps.definingLoveSongForTheSelf,
	steps.didLoveSongForTheSelfTipTheScales,

	steps.introducingSexualConquest,
	steps.definingSexualConquest,
	steps.sexualConquestInContext,

	// Conclusion:
	steps.addInNonLoveSongsInGray,
	steps.theLoveSongIsActuallyRising,
	// steps.trendsWeExplored,
	steps.whatCausedTheseChanges,

	// Explore mode
	steps.youDecide
];

export const storySteps = unprocessedStorySteps.map((step) => ({
	...step,
	showXAxis:
		step.visualEncodings.calculateXForcePosition === getXPositionFromTime
}));

// Export steps as a CSV for easy editing in Excel
// console.log(storySteps.map((step, i) => `${i}) ${step.text}`).join("\n"));

export const currentStoryStepIndex = writable(0);

const previousStoryStepIndex = previous(currentStoryStepIndex, null);

export const currentStoryStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => storySteps[$currentStoryStepIndex]
);

export const restartBubbles = derived(
	[currentStoryStepIndex, previousStoryStepIndex],
	([$currentStoryStepIndex, $previousStoryStepIndex]) => {
		const isAdvancingIntoStep =
			$currentStoryStepIndex > $previousStoryStepIndex ||
			$previousStoryStepIndex === null;

		if (isAdvancingIntoStep) {
			return storySteps[$currentStoryStepIndex].visualEncodings
				.restartBubblesOnAdvanceInto;
		} else {
			return storySteps[$currentStoryStepIndex].visualEncodings
				.restartBubblesOnReturnInto;
		}
	}
);
