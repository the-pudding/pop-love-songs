import { derived, writable } from "svelte/store";
import previous from "./previous";
import viewport from "./viewport";
import {
	selectedGenders,
	selectedPerformers,
	selectedSongs
} from "./searchAndFilter";

import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS,
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
	colorButDontSeperateThisLoveSongType: null,

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
	haveYouSeenTheseYouTubeComments: {
		text: "Have you ever seen a comment like this? 'no cussing, no drugs, no twerking. they don't make love songs like this anymore'. They seem to be part of a larger sentiment: something about contemporary music is in decline.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: ["FAAAAKKEEE"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			onLoadUseRandomInitialPositions: true,
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			forceXStrength: 0.2,
			forceYStrength: 0.2
		}
		// showBoomerBobImages: true
	},
	boomerBobSaysLoveSongsAreDying: {
		text: "This Baby Boomer-centric sentiment seems to crystalize around one topic in particular: modern pop music's treatment of love & romance -- or the lack thereof. According to Boomer Bob, the love song is, apparently, dying.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: ["FAAAAKKEEE"],
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

	titleCard: {
		text: "Is it true? Has the younger generation killed off romance in favor of lust (or whatever else Boomer Bob bemoans?) Let's investigate. [TITLE CARD: 'is the love song dying?' maybe made out of bubbles]",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: ["FAAAAKKEEE"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			onLoadUseRandomInitialPositions: true,
			calculateXForcePosition: fractionOfScreenFactory(0.5, 0),
			calculateYForcePosition: fractionOfScreenFactory(0.5, 0),
			forceXStrength: 0.2,
			forceYStrength: 0.2
		}
		// showBoomerBobImages: true
	},

	allTheBillboardHitsInAMonoChromeCluster: {
		text: "Here are all 5,100 Billboard Top 10 hits from 1958 - September 2023. A each bubble is a song. The bigger the bubble, the longer it spent in the Top 10 (regardless of its exact rank). [hover for more info]",
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
		text: "These are the 1,040 Top 10 hits we think Boomer Bob would *definitely* consider love songs (labeled by hand and with ChatGPT[hover for more info]). All these songs are unmistakably about romantic love & devotion. They play at weddings & proms. Think 'No One' by Alicia Keys or 'Perfect' by Ed Sheeran.",
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
	serenadesAreIndeedDying: {
		text: "If you spread these classic love songs on a timeline, they are indeed declining...",
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
		text: "They peaked in the 90s with hits like 'I'll Make Love to You' by Boyz II Men...",
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
		text: "... then they waned. Today, only a few artists like Biebs & T-Swift champion them. But how much have these types of love songs dropped off, exactly?",
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
		text: "To see, here are the love songs as a proportion of all other Billboard Top 10 hits. Egads! The proportion of love songs in the 2020s is 41% less than in the 1960s! So, was Boomer Bob right? Are love songs, in fact, dying?",
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
		text: "Not quite: we think Boomer Bob has too narrow of a view of love. Sure, these lovey-dovey tunes have declined. But what about other songs? What about 'I Will Always Love You' by Whitney Houston? Is 'Buy U A Drank' by T-Pain a love song? Or 'WAP'?",
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
				{ song: "I Will Always Love You", year: 1992 },
				{ song: "WAP", year: 2020 }
			]
		}
	},
	whyWeCare: {
		text: "It's easy to just shake our fists and say, 'Kids these days don't value love anymore!' But, instead, if we challenge ourselves to look deeper at love songs -- and romance itself -- we uncover a far more complex (and fascinating) story. A story that will change how you see love in pop music. Let's dive in...",
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
	definingSerenades: {
		text: "On our journey to a more expansive view of love, we'll introduce other (often less known) types of love songs, one at a time. Earlier we showed you most obvious form of love songs, which we'll call 'Serenades'. They're typified by a simple relationship: you loves someone, and they love you back!",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => ![LOVE_SONG_TYPE_CONSTANTS.serenade].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnReturnInto: false
		}
	},
	colorInHeartbreak: {
		text: "But what happens if you love them, but they just... don't? Let's call this new type of sad love song 'Longing & Heartbreak.'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => ![LOVE_SONG_TYPE_CONSTANTS.serenade].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			colorButDontSeperateThisLoveSongType:
				LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
			restartBubblesOnAdvanceInto: false
		}
	},

	// Remaining Boomer-Bob-friendly types:
	introducingLongingAndHeartbreak: {
		text: "Think: The Beatle's 'Yesterday' or  Whitney Houston's 'I Will Always Love You'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Yesterday", year: 1965 },
				{ song: "I Will Always Love You", year: 1992 },
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
		text: "Did adding Heartbreak & Longing save the love song? Nope! Their decline changed little.",
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
				{ song: "All For You", year: 2001 },
				{ song: "Call Me Maybe", year: 2012 },
				{ song: "I Want To Hold Your Hand", year: 1964 }
			]
		}
	},
	courtshipHasNoEffect: {
		text: "But these 'Courtship & Anticipation' songs remain fairly steady over time. Meaning the love song is still in decline. So... was Boomer Bob right? I mean, what aspects of love could you sing about beyond new love, true love, & heartbreak?",
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
		text: "... a lot, if you're willing to explore the messier side of romance! Like what about when a relationship isn't clearly good *or* bad? Maybe you fight consantly. Maybe they're unfaithful. But you still try to make it work because... well, 'It's Complicated!'",
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
	itsComplicatedDoesNotTipTheScales: {
		text: "Can this angsty genre save the love song? No, but we're getting closer! Pop culture increasingly warmed up to these messy tunes, but love songs are still down 16%.",
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
		text: "Ok, so what about those songs where the relationship *is* clearly over, but the singer's heartbreak has resurrected into... rightious power? Think Kelly Clarksen and Mariah Carey, who sport a combined *9* Top 10 hits of this type alone.",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.goodRiddance],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Runaround Sue", year: 1961 },
				{ song: "I Will Survive", year: 1979 },
				{ song: "Survivor", year: 2001 },
				{ song: "Good 4 U", year: 2021 }
			]
		}
	},
	goodRiddanceDoesNotTipTheScale: {
		text: "Hits like GAYLE's oh-so-subtle 'abcdefu' surged in the last few decades -- and reduce the love song's decline to under 10%! Maybe love's not dead... just a little wounded?",
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

	// Sexual Confidence

	introducingSexualConquest: {
		text: "But we can't call it just yet. What about these songs that get... a little steamy. Think about artists like Nicki Minaj and Drake with their respective hits 'WAP' and 'Way 2 Sexy.'",
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.sexualConquest],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: [
				{ song: "Physical", year: 1981 },
				{ song: "WAP", year: 2020 },
				{ song: "Way 2 Sexy", year: 2021 }
			]
		}
	},
	sexualConquestInContext: {
		// TODO: this could be a tooltip for those wanting to engage a bit more:
		// "Has lust replaced love? Maybe. But, as theorists point out, perhaps the younger generation sees sex as a *gateway* to love. (or maybe it's just more socially acceptable to be horny!)"
		text: "As Boomers bemoan, these 'Sexual Confidence' songs exploded in popularity, nearly eclipsing the Serenade in the 2000s. With this more sensual side of love... the modern love song is *exactly* as strong as in Boomer Bob's day! Our last type could tip the balance...",
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
						LOVE_SONG_TYPE_CONSTANTS.sexualConquest
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
		text: "We've ventured *very* far from the Serenade. Far enough to finds its reincarnation: songs where heartbreak turns love... back onto the OG, yourself. Like, 'You don't love me? That's ok, because I do! In fact, I'll by *myself* flowers...'",
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
				// { song: "Thank U, Next", year: 2018 },
				{ song: "Flowers", year: 2023 }
			]
		}
	},
	didLoveSongForTheSelfTipTheScales: {
		text: "This women-pioneered 'Love Song for the Self' is the most modern of all the genres. Yes, Boomer Bob: it's not written *to* a lover. But, in fact, it's often written in reaction to romantic rejection. Ok... so where does it leave us? Is the love song dying?",
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
						LOVE_SONG_TYPE_CONSTANTS.sexualConquest,
						LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
					].includes(t)
			),
			visibleButNotSelectedLoveSongTypes: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		}
		// showLoveSongChange: true
	},

	theLoveSongIsActuallyRising: {
		// — even if those ways look different from generations of old
		text: "We don't think so — we think it's just evolving! To begin, it's actually increased by 12%. But it's not just about volume: people are loving, losing, and connecting in more ways than ever before.",
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
		text: "But, ultimately, the status of love songs depends on what *you* count as a love song. (Boomer Bob probably still only counts Serenades!) So, you decide: add and remove love songs based on your definition, and tell *us* how the love song is doing! (for nerds: try the advanced filters in the top bar)",
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
	// Intro
	steps.haveYouSeenTheseYouTubeComments,
	steps.boomerBobSaysLoveSongsAreDying,
	steps.titleCard,

	steps.allTheBillboardHitsInAMonoChromeCluster,
	steps.highlightSerenadesWithinCluster,

	steps.serenadesAreIndeedDying,
	steps.serenadesPeakedInThe90s,
	steps.aFewArtistsKeepThemAliveToday,
	steps.anAggSnakeChartMakesBoomerBobSeemRight,

	// What counts as love song?
	steps.butWeWillTakeAMoreExpansiveView,
	steps.whyWeCare,

	// Boomer-Bob-friendly types:
	steps.definingSerenades,
	steps.colorInHeartbreak,
	steps.introducingLongingAndHeartbreak,
	steps.longingAndHeartbreakComparedToSerenade,
	steps.longingAndHeartbreakDoNotTipTheScales,

	steps.introducingCourtship,
	steps.courtshipHasNoEffect,

	// Expansive-mode
	steps.introducingItsComplicated,
	steps.itsComplicatedDoesNotTipTheScales,

	steps.introducingGoodRiddance,
	steps.goodRiddanceDoesNotTipTheScale,

	steps.introducingSexualConquest,
	steps.sexualConquestInContext,

	steps.introducingLoveSongForTheSelf,
	steps.didLoveSongForTheSelfTipTheScales,

	// Conclusion:
	steps.theLoveSongIsActuallyRising,
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

// All this is to prevent the bubbles from restarting when the user is merely searching:

const previousSelectedGenders = previous(selectedGenders, []);
const previousViewport = previous(viewport, { width: null, height: null });

// TODO: OPTIMIZATION, if we update songIsVisible to a memoized custom store, I think we can remove all this code
export const preventBubbleRestartBecauseTheUserIsMerelySearching = derived(
	[
		currentStoryStep,
		previousSelectedGenders,
		selectedGenders,
		selectedPerformers,
		selectedSongs,
		previousViewport,
		viewport
	],
	([
		$currentStoryStep,
		$previousSelectedGenders,
		$selectedGenders,
		$selectedPerformers, // we just need to update when these change
		$selectedSongs,
		$previousViewport,
		$viewport
	]) => {
		const genderHasChanged =
			$selectedGenders.sort().join(",") !==
			$previousSelectedGenders.sort().join(",");
		const viewportChanged =
			viewport.width !== null &&
			($viewport.width !== $previousViewport.width ||
				$viewport.height !== $previousViewport.height);

		if (
			!$currentStoryStep.allowUserToChangeFilters ||
			genderHasChanged ||
			viewportChanged
		) {
			return false;
		}
		// So: if we're on a filter step & the gender selection NOT changed, don't restart the bubbles
		return true;
	}
);
