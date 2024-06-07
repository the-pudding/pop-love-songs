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
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			restartBubblesOnReturnInto: false,
			forceXStrength: 0.1,
			forceYStrength: 0.1
		}
	},
	highlightSerenadesWithinCluster: {
		text: "... you'll see tons of what you might call Serenades: songs that directly express a feeling of love and/or devotion for someone. Swelling strings, a more slow-to-moderate tempo, perfect to dance to at prom or a wedding... How sweet!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
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
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			forceXStrength: 0.2,
			forceYStrength: 0.2
		}
	},
	serenadesAreIndeedDying: {
		text: "If you spread the Serenades from 1959-2023, they are indeed declining...",
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
		text: "... then they've waned: only a few artists like Biebs & T-Swift champion Serenades these days.",
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
		text: "When we compare the proportion of love songs to all other pop hits, we see a striking, nearly 50% drop. So, we have to ask: is Boomer Bob right? Are love songs dying?",
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
		text: "Not quite: we think Boomer Bob has too narrow of a view of love. Sure, Serenades have declined. But what about other songs? Is 'Buy U A Drank' by T-Pain a love song? What about 'I Will Always Love You' by Whitney Houston? 'WAP'? In this piece, we'll take a more expansive view.",
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
		text: "Our world has changed immensely since 1959. It's easy to shake our fists and say, 'It's all gone down hill!' But we miss out on what's really happening. There's a fascinating story of complexity & change, if we challenges ourselves to look deeper at love songs -- and romance itself. So let's do that...",
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
		text: "Earlier we showed you the Serenades. These are the bona fide love songs, passed down from ancient times: you loves someone, and they love you back! It's the best-case scenario. But what happens if you love them, but they just... don't?",
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
		loveSongTypeDefinitionImage: "longing-&-heartbreak"
	},

	// Remaining Boomer-Bob-friendly types:
	introducingLongingAndHeartbreak: {
		text: "Longing & Heartbreak is what happens. Ouch! It's typified here by songs like Whitney Houston's 'I Will Always Love You' or Rihanna's 'Stay,' with a knack for showcasing the more virtuosic parts of a singer's craft...",
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
		text: "Does expanding to include Heartbreak & Longing reveal that love songs are still alive and well? Not at all! Love songs have still dropped just as precipitously since the 60s!",
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
		text: "Now, let's explore love songs that pull in more of romance's complexity. What about when a relationship isn't clearly good or bad? You're with someone, but constantly fighting. Or maybe you know they're unfaithful, but still want to work it out...",
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
		text: "Sometimes a romantic relationship isn't squarely thriving or over. Sometimes... It's Complicated. ",
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
		loveSongTypeDefinitionImage: "its-complicated"
	},
	itsComplicatedDetail: {
		text: "It's Complicated hit its stride in the 00s and 10s, surpassing Courtship & Anticipation as well as Longing & Heartbreak. If these songs are any indication, angst is on the rise in romance!",
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
		text: "Can this angsty genre save the love song? Not quite. We're getting closer, but the 60s still sport a more than a 25% advantage over the modern era.",
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
		text: "But we're not done. Let's look at two more modern & female-pioneered types, starting with: Good Riddance, ranging from Dion's 'Runaround Sue' (1962) to Olivia Rodrigo's 2021 'Good 4 U.'",
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
		text: "Good Riddance is like Longing & Heartbreak, but with a bite. You've ended your relationship, but instead of feeling sad, you think -- wow, I dodged a bullet! My ex sucks!",
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
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "No More Tears (Enough Is Enough)", year: 1980 },
				{ song: "Stronger (What Doesn't Kill You)", year: 2011 }
			]
		}
	},
	goodRiddanceDoesNotTipTheScale: {
		text: "But, even with modern hits like 'Without You' by Halsey and 'Good 4 U' by Olivia Rodrigo, Good Riddance only gives a small bump to the love song category.",
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
		text: "Ok, fine. But what about when heartbreak turns love... back onto the OG, yourself? Think: TLC & Destiny's Child in the early 2000s or Ariana Grande's 'Thank U, Next' in this female-dominated type.",
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
		text: "This Love Song for the Self is like a Serenade, but for the self. While it's never written to a lover, it's often written in reaction to romantic rejection -- you don't love me? That's ok, because I do!",
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
	didLoveSongForTheSelfTipTheScales: {
		text: "But even with Good Riddance & largerly women-pioneered Love Song for the Self, love songs are still in decline - though less than before!",
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
		text: "But we've got one love song type left: songs that get... a little steamy. Think about artists like Nicki Minaj and Drake with their respective hits 'WAP' and 'Way 2 Sexy.'",
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
		text: "These songs blur the lines between courtship and romance (and perhaps love and lust), and we'll call them Sexual Confidence. Throbbing club beats and dance mixes... confident tunes that blend and remix genres...",
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
	sexualConquestInContext: {
		text: "As Boomers bemoan, Sexual Confidence has risen in popularity in recent decades. It's even dethroned Serenades in the 2000s! Are today's youth far more interested in sex than love? Maybe. Other theoriests point out that for many of today's young people, sex has become the GATEWAY to love -- the first step, not the destination.",
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
		text: "Now it's finally time to zoom out and answer our original question: is the love song dying? Let's look at the aggregate in 3, 2...",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		}
	},

	theLoveSongIsActuallyRising: {
		text: "... and we have our answer: the love song is just as strong as it ever was (>2% decline since the 60s!) In fact, love songs today are arguably more alive, encompassing more of the complexity of romance.",
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

	trendsWeExplored: {
		text: "Some of the trends we've explored have been: the decline of the Serenade, the rise of the Heartbreak Song and the steady growing popularity of more complex love song types like It's Complicated and Good Riddance. Meanwhile, feel-good genres like Sexual Confidence and Love Song for the Self are lending a distinctly empowering feel to the ol' L-word.",
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
	whatCausedTheseChanges: {
		text: "What caused these changes? Speculations abound -- on one hand, we've certainly changed how we think about love and relationships since the 60's. On the other hand, how Billboard ranks songs itself has changed, from a loosely polling record stores to analyzing streaming. It's possible many of these love songs were always popular -- it just took the Billboard recognizing streaming for them to be recognized.",
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
		text: "But what about you? Do these count as 'love songs,' or do you have a different definition? You decide: click the buttons by the love song type labels to determine what does and doesn't count as a love song, and tell US how the love song is doing!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true,
		allowUserToChangeFilters: true
	},
	youDecideBubbleVersion: {
		text: "[bubble view, mostly just for us to play with during development -- worth keeping as an option to switch to here in the sandbox? [hit 'd' to open/close filters]]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE
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
	steps.trendsWeExplored,
	steps.whatCausedTheseChanges,

	// Explore mode
	steps.youDecide,
	steps.youDecideBubbleVersion
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
