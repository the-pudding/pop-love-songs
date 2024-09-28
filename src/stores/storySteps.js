import { derived, writable } from "svelte/store";
import previous from "./previous";
import viewport from "./viewport";

import copy from "$data/copy.json";
import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS,
	LOVE_SONG_TYPES
} from "$data/data-constants.js";
import { MAX_DATE, MIN_DATE } from "$data/songs-data.js";
import {
	NON_SERENADE_HIGHLIGHTS_FROM_INTRO,
	SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD,
	SERENADE_HIGHLIGHTS_FROM_INTRO,
	getXPositionFromTime,
	getYPositionInSnakeChart,
	randomXDistribution,
	randomYDistribution
} from "./forcePositionOptions-helper.js";
import { aSearchBarIsFocused } from "./searchAndFilter";

const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],
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

	calculateXForcePosition: getXPositionFromTime,
	calculateYForcePosition: getYPositionInSnakeChart,
	forceXStrength: 7, // it is FAR more important that the bubble is accurate to the time encoding
	forceYStrength: 1, // the y position can be a bit more flexible
	restartBubblesOnAdvanceInto: true,
	restartBubblesOnReturnInto: true,

	showAggregateSnakeChart: false,

	useHeavierSongBorders: false,
	showTotalWeeksInTop10InSongInfo: false,

	songAnnotations: {
		offsetFromThisYPercentage: undefined, // 0 - 1
		adjacentAnnotations: [],
		offsetAnnotations: []
	}
};

const stepsWithoutText = {
	// Intro: Is Boomer Bob right that the love song is dying?
	haveYouSeenTheseYouTubeComments: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES,
			selectedLoveSongTypes: ["FAAAAKKEEE", "also fake"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: randomXDistribution,
			calculateYForcePosition: randomYDistribution
		},
		showOpeningComment: true
	},
	boomerBobSaysLoveSongsAreDying: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES,
			selectedLoveSongTypes: ["FAAAAKKEEE", "also fake"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: randomXDistribution,
			calculateYForcePosition: randomXDistribution
		},
		showHeadlinesAboutLoveSongDecline: true
	},

	titleCard: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES,
			selectedLoveSongTypes: ["FAAAAKKEEE", "also fake"],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: randomXDistribution,
			calculateYForcePosition: randomYDistribution
		},
		showTitleCard: true
	},

	allTheBillboardHitsInAMonoChromeCluster: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: randomXDistribution,
			calculateYForcePosition: randomYDistribution,
			restartBubblesOnAdvanceInto: true, // a little wiggle is nice
			restartBubblesOnReturnInto: false, // nothing's changed position-wise
			forceXStrength: 1,
			forceYStrength: 1,
			songAnnotations: {
				adjacentAnnotations: NON_SERENADE_HIGHLIGHTS_FROM_INTRO
			}
		},
		showTotalWeeksInTop10InSongInfo: true
	},
	highlightSerenadesWithinCluster: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			),
			visibleButNotSelectedLoveSongTypes: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: randomXDistribution,
			calculateYForcePosition: randomYDistribution,

			useHeavierSongBorders: true,

			restartBubblesOnAdvanceInto: false,
			forceXStrength: 1,
			forceYStrength: 1,
			songAnnotations: {
				adjacentAnnotations: SERENADE_HIGHLIGHTS_FROM_INTRO
			}
		}
	},
	serenadesAreIndeedDying: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			),
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.serenade],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			calculateXForcePosition: getXPositionFromTime,
			// restartBubblesOnReturnInto: false,
			forceXStrength: 1,
			forceYStrength: 0.5,
			songAnnotations: {
				adjacentAnnotations: SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD
			}
		}
	},
	serenadesPeakedInThe90s: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			),
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
			restartBubblesOnReturnInto: false,
			forceXStrength: 11,
			forceYStrength: 0.5,
			songAnnotations: {
				adjacentAnnotations: [{ song: "I'll Make Love To You", year: 1994 }]
			}
		}
	},
	aFewArtistsKeepThemAliveToday: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			),
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
			restartBubblesOnAdvanceInto: false,
			restartBubblesOnReturnInto: true,
			forceXStrength: 11,
			forceYStrength: 0.5,
			songAnnotations: {
				adjacentAnnotations: [
					{ song: "Love Story", year: 2008, rightAlign: true },
					{ song: "Intentions", year: 2020, rightAlign: true, placeBelow: true }
				]
			}
		}
	},
	anAggSnakeChartMakesBoomerBobSeemRight: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnReturnInto: false,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},

	butWeWillTakeAMoreExpansiveView: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnAdvanceInto: false,
			restartBubblesOnReturnInto: false,
			songAnnotations: {
				adjacentAnnotations: [
					{
						song: "I Will Always Love You",
						year: 1992,
						rightAlign: true,
						audioFile: "i-will-always-love-you",
						yPercent: 0.2
					},
					{
						song: "Buy U A Drank (Shawty Snappin')",
						alternateTitle: "Buy U A Drank",
						year: 2007,
						rightAlign: true,
						audioFile: "buy-u-a-drank",
						yPercent: 0.55
					},
					{
						song: "WAP",
						year: 2020,
						rightAlign: true,
						audioFile: "wap",
						yPercent: 0.7
					}
				]
			}
		}
	},

	whyWeCare: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => t !== LOVE_SONG_TYPE_CONSTANTS.serenade
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnAdvanceInto: false,
			restartBubblesOnReturnInto: false,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true
	},
	definingSerenades: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) => ![LOVE_SONG_TYPE_CONSTANTS.serenade].includes(t)
			)
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			restartBubblesOnAdvanceInto: false,
			restartBubblesOnReturnInto: false,
			songAnnotations: {
				offsetFromThisYPercentage: 0.9,
				offsetAnnotations: [
					{ song: "Fever", year: 1958, audioFile: "fever" },
					{ song: "Like A Virgin", year: 1984, audioFile: "like-a-virgin" },
					{
						song: "Just The Way You Are",
						year: 2010,
						// rightAlign: true,
						placeAbove: true,
						audioFile: "just-the-way-you-are-2010"
					}
				]
			}
		}
	},
	colorInHeartbreak: {
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
			restartBubblesOnAdvanceInto: false,
			songAnnotations: {
				adjacentAnnotations: [
					{
						song: "Heartbreaker",
						year: 1983,
						rightAlign: true,
						audioFile: "heartbreaker",
						yPercent: 0.45
					},
					{
						song: "You Belong With Me",
						year: 2009,
						rightAlign: true,
						audioFile: "you-belong-with-me",
						yPercent: 0.25
					}
				]
			}
		}
	},

	// Remaining Boomer-Bob-friendly types:
	introducingLongingAndHeartbreak: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
					].includes(t)
			),
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: {
				offsetAnnotations: [
					{ song: "Yesterday", year: 1965, audioFile: "yesterday" },
					{
						song: "I Will Always Love You",
						year: 1992,
						placeAbove: true,
						audioFile: "i-will-always-love-you"
					},
					{ song: "Stay", year: 2013, audioFile: "stay" }
				]
			}
		}
	},

	longingAndHeartbreakComparedToSerenade: {
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
			restartBubblesOnReturnInto: false,
			// Since we're introducing (and pointing out) sorting here, it's key that they are nicely herded
			forceXStrength: 10,
			forceYStrength: 3,
			songAnnotations: {
				adjacentAnnotations: [
					{
						song: "Blinding Lights",
						year: 2020,
						rightAlign: true,
						audioFile: "blinding-lights"
					}
				]
			}
		}
	},

	longingAndHeartbreakDoNotTipTheScales: {
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
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES.filter(
				(t) =>
					![
						LOVE_SONG_TYPE_CONSTANTS.serenade,
						LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak,
						LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
					].includes(t)
			),
			selectedLoveSongTypes: [
				LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation
			],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: {
				offsetAnnotations: [
					{
						song: "I Want To Hold Your Hand",
						year: 1964,
						audioFile: "i-want-to-hold-your-hand"
					},
					// { song: "All For You", year: 2001, audioFile: "all-for-you" },
					{
						song: "Buy U A Drank (Shawty Snappin')",
						alternateTitle: "Buy U A Drank",
						year: 2007,
						offsetToThisYear: 2000,
						audioFile: "buy-u-a-drank"
					},
					{ song: "Call Me Maybe", year: 2012, audioFile: "call-me-maybe" }
				]
			}
		}
	},
	courtshipHasNoEffect: {
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
			),
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.itsComplicated],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: {
				offsetAnnotations: [
					{
						song: "Will You Love Me Tomorrow",
						year: 1961,
						audioFile: "will-you-love-me-tomorrow"
					},
					{
						song: "Quit Playing Games (With My Heart)",
						year: 1997,
						audioFile: "quit-playing-games-with-my-heart"
					},
					{ song: "In My Feelings", year: 2018, audioFile: "in-my-feelings" }
				]
			}
		}
	},
	itsComplicatedDoesNotTipTheScales: {
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
			),
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.goodRiddance],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: {
				offsetAnnotations: [
					// { song: "Runaround Sue", year: 1961, audioFile: "TODO" },
					{ song: "I Will Survive", year: 1979, audioFile: "i-will-survive" },
					{ song: "So What", year: 2008, audioFile: "so-what" },
					{ song: "Good 4 U", year: 2021, audioFile: "good-4-u" }
				]
			}
		}
	},
	goodRiddanceDoesNotTipTheScale: {
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

	introducingSexualConfidence: {
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
						LOVE_SONG_TYPE_CONSTANTS.sexualConfidence
					].includes(t)
			),
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.sexualConfidence],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: {
				offsetAnnotations: [
					{ song: "Physical", year: 1981, audioFile: "physical" },
					{ song: "WAP", year: 2020, audioFile: "wap", offsetToThisYear: 2010 },
					{ song: "Way 2 Sexy", year: 2021, audioFile: "way-2-sexy" }
				]
			}
		}
	},
	sexualConfidenceInContext: {
		// TODO: this could be a tooltip for those wanting to engage a bit more:
		// "Has lust replaced love? Maybe. But, as theorists point out, perhaps the younger generation sees sex as a *gateway* to love. (or maybe it's just more socially acceptable to be horny!)"
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
						LOVE_SONG_TYPE_CONSTANTS.sexualConfidence
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
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			selectedLoveSongTypes: [LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf],
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			songAnnotations: {
				offsetAnnotations: [
					{ song: "I Am Woman", year: 1972, audioFile: "i-am-woman" },
					{ song: "Unpretty", year: 1999, audioFile: "unpretty" },
					// { song: "Thank U, Next", year: 2018, audioFile: "TODO" },
					{ song: "Flowers", year: 2023, audioFile: "flowers" }
				]
			}
		}
	},
	didLoveSongForTheSelfTipTheScales: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
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
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			columnsToFilterVisibilityOn: [SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true,
		isFinalComparisonStep: true
	},

	// Explore mode
	youDecide: {
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE
		},
		visualEncodings: {
			...VISUAL_ENCODING_BLANK_STATE,
			showAggregateSnakeChart: true,
			// a little extra strenth helps keep the chart a bit clearer
			forceXStrength: 8,
			forceYStrength: 2
		},
		showLoveSongChange: true
	}
};

const steps = Object.keys(stepsWithoutText).reduce(
	(acc, key) => ({
		...acc,
		[key]: {
			...stepsWithoutText[key],
			text: copy.stepText[key]
		}
	}),
	{}
);

const unprocessedStorySteps = [
	// Intro
	steps.haveYouSeenTheseYouTubeComments,
	steps.boomerBobSaysLoveSongsAreDying,
	steps.titleCard,

	steps.allTheBillboardHitsInAMonoChromeCluster,
	steps.highlightSerenadesWithinCluster,

	steps.serenadesAreIndeedDying,
	// steps.serenadesPeakedInThe90s,
	// steps.aFewArtistsKeepThemAliveToday,
	steps.anAggSnakeChartMakesBoomerBobSeemRight,

	// What counts as love song?
	steps.butWeWillTakeAMoreExpansiveView,
	// steps.whyWeCare,

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

	steps.introducingSexualConfidence,
	steps.sexualConfidenceInContext,

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
		step.visualEncodings.calculateXForcePosition === getXPositionFromTime,
	chartOccupiesFullScreen:
		step.visualEncodings.calculateXForcePosition === randomXDistribution ||
		step.visualEncodings.calculateYForcePosition === randomYDistribution
}));

// Export steps as a CSV for easy editing in Excel
// console.log(storySteps.map((step, i) => `${i}) ${step.text}`).join("\n"));

export const currentStoryStepIndex = writable(0);
export const isLastStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => $currentStoryStepIndex === storySteps.length - 1
);

const previousStoryStepIndex = previous(currentStoryStepIndex, null);

export const currentStoryStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => storySteps[$currentStoryStepIndex]
);

const spotlightedLoveSongType = (storyStep) => {
	if (!storyStep) return false;
	if (
		storyStep.searchAndFilterState.selectedLoveSongTypes.length === 1 &&
		!storyStep.visualEncodings.showAggregateSnakeChart
	) {
		return storyStep.searchAndFilterState.selectedLoveSongTypes[0];
	}
	return false;
};

export const aSingleLoveSongTypeIsSpotlighted = derived(
	[currentStoryStep],
	([$currentStoryStep]) => !!spotlightedLoveSongType($currentStoryStep)
);

export const precedingStepSpotlightedType = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) =>
		spotlightedLoveSongType(storySteps[$currentStoryStepIndex - 1])
);

export const showSearchBars = derived(
	[aSingleLoveSongTypeIsSpotlighted, viewport, isLastStep],
	([$aSingleLoveSongTypeIsSpotlighted, $viewport, $isLastStep]) =>
		!$viewport.isLikelyInMobileLandscape &&
		($aSingleLoveSongTypeIsSpotlighted || $isLastStep)
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

// TODO: OPTIMIZATION, if we update songIsVisible to a memoized custom store, I think we can remove all this code
export const preventBubbleRestartBecauseTheUserIsMerelySearching = derived(
	[aSearchBarIsFocused],
	([$aSearchBarIsFocused]) => {
		// TODO: we may need more sophisticated checks when the dropdown selection is added
		return $aSearchBarIsFocused;
	}
);
