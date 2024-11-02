import { derived, writable } from "svelte/store";
import viewport from "./viewport";
import previous from "./previous";

import copy from "$data/copy.json";
import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_CONSTANTS,
	LOVE_SONG_TYPES
} from "$data/data-constants.js";
import { MAX_DATE, MIN_DATE } from "$data/songs-data.js";
import {
	ANNOTATION_METADATA,
	getXPositionFromTime,
	getYPositionInSnakeChart,
	randomXDistribution,
	randomYDistribution
} from "./forcePositionOptions-helper.js";
import { aSearchBarIsFocused } from "./searchAndFilter";

const SEARCH_AND_FILTER_BLANK_STATE = {
	selectedLoveSongTypes: [],

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

	showAggregateSnakeChart: false,

	useHeavierSongBorders: false,
	showTotalWeeksInTop10InSongInfo: false,

	manuallySetPositions: [],
	songAnnotations: {
		offsetFromThisYPercentage: undefined, // 0 - 1
		adjacentAnnotations: [],
		offsetAnnotations: []
	}
};

const stepsWithoutText = {
	// Intro: Is Boomer Bob right that the love song is dying?
	haveYouSeenTheseYouTubeComments: {
		hideViz: true,
		showOpeningComment: true,

		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE,
		visualEncodings: VISUAL_ENCODING_BLANK_STATE
	},
	boomerBobSaysLoveSongsAreDying: {
		hideViz: true,
		showHeadlinesAboutLoveSongDecline: true,

		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE,
		visualEncodings: VISUAL_ENCODING_BLANK_STATE
	},

	titleCard: {
		hideViz: true,
		// Note: we actually have ot set these values so that the bubbles fade in from gray (not their colors), cuz stores run before the viz is rendered
		searchAndFilterState: {
			...SEARCH_AND_FILTER_BLANK_STATE,
			typesTreatedAsNonLoveSongs: LOVE_SONG_TYPES
		},
		visualEncodings: VISUAL_ENCODING_BLANK_STATE,
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
			forceXStrength: 1,
			forceYStrength: 1,

			manuallySetPositions: ANNOTATION_METADATA.intro.manuallySetPositions,
			songAnnotations: {
				adjacentAnnotations:
					ANNOTATION_METADATA.intro.annotations.nonSerenadeHighlights
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

			forceXStrength: 1,
			forceYStrength: 1,

			manuallySetPositions: ANNOTATION_METADATA.intro.manuallySetPositions,
			songAnnotations: {
				adjacentAnnotations:
					ANNOTATION_METADATA.intro.annotations.serenadeHighlights
			}
		},
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.serenade
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
			forceXStrength: 1,
			forceYStrength: 0.5,
			manuallySetPositions:
				ANNOTATION_METADATA.timelineSpread.manuallySetPositions,
			songAnnotations: {
				adjacentAnnotations:
					ANNOTATION_METADATA.timelineSpread.annotations.serenadeHighlights
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
			showAggregateSnakeChart: true,
			// Trying to pre-set positions, so it doesn't re-start the force layout as it sees different position data
			manuallySetPositions:
				ANNOTATION_METADATA.serenadeComparisons.manuallySetPositions
		},
		showLoveSongChange: true,
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.serenade
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
			manuallySetPositions:
				ANNOTATION_METADATA.serenadeComparisons.manuallySetPositions,
			songAnnotations: {
				adjacentAnnotations:
					ANNOTATION_METADATA.serenadeComparisons.annotations
						.butWeWillTakeAMoreExpansiveView
			}
		},
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.serenade
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
			manuallySetPositions:
				ANNOTATION_METADATA.serenadeComparisons.manuallySetPositions,
			songAnnotations: {
				offsetFromThisYPercentage: 0.9,
				offsetAnnotations:
					ANNOTATION_METADATA.serenadeComparisons.annotations.definingSerenades
			}
		},
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.serenade
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
			manuallySetPositions:
				ANNOTATION_METADATA.serenadeComparisons.manuallySetPositions,
			songAnnotations: {
				adjacentAnnotations:
					ANNOTATION_METADATA.serenadeComparisons.annotations.colorInHeartbreak
			}
		},
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
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
						song: "Without You/Never Forget You",
						year: 1994,
						audioFile: "without-you",
						placeAbove: true
					},
					{
						song: "You Belong With Me",
						year: 2009,
						audioFile: "you-belong-with-me"
					}
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
			// Since we're introducing (and pointing out) sorting here, it's key that they are nicely herded
			forceXStrength: 10,
			forceYStrength: 3,
			songAnnotations: {
				adjacentAnnotations: [
					{
						song: "Blinding Lights",
						year: 2020,
						rightAlign: true,
						noWrapTitle: true,
						audioFile: "blinding-lights"
					}
				]
			}
		},
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
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
			showAggregateSnakeChart: true
		},
		showLoveSongChange: true,
		typeToShowInProgressBar: LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
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
						offsetToThisYear: 1994,
						rightAlign: true,
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
					{
						song: "Good 4 U",
						year: 2021,
						audioFile: "good-4-u",
						rightAlign: true
					}
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
					// { song: "Way 2 Sexy", year: 2021, audioFile: "way-2-sexy" }
					{ song: "Work", year: 2016, audioFile: "work", rightAlign: true },
					{
						song: "WAP",
						year: 2020,
						audioFile: "wap",
						offsetToThisYear: 2019,
						rightAlign: true
					}
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
		showLoveSongChange: true,
		isEndingSandboxStep: true
	},

	// Footer
	footer: {
		hideViz: true,
		showFooter: true,

		searchAndFilterState: SEARCH_AND_FILTER_BLANK_STATE,
		visualEncodings: VISUAL_ENCODING_BLANK_STATE
	}
};

const steps = Object.keys(stepsWithoutText).reduce(
	(acc, key) => ({
		...acc,
		[key]: {
			...stepsWithoutText[key],
			text: copy.stepText[key].copy,
			figCaption: copy.stepText[key].figCaption
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
	steps.anAggSnakeChartMakesBoomerBobSeemRight,

	// What counts as love song?
	steps.butWeWillTakeAMoreExpansiveView,

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
	steps.youDecide,

	// Footer, links etc
	steps.footer
];

export const storySteps = unprocessedStorySteps.map((step) => ({
	...step,
	showXAxis:
		step.visualEncodings.calculateXForcePosition === getXPositionFromTime
}));

// Export steps as a CSV for easy editing in Excel
// console.log(storySteps.map((step, i) => `${i}) ${step.text}`).join("\n"));

export const currentStoryStepIndex = writable(0);

export const TOTAL_STORY_STEPS = storySteps.length;

export const isLastStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => $currentStoryStepIndex === TOTAL_STORY_STEPS - 1
);

export const currentStoryStep = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) => storySteps[$currentStoryStepIndex]
);

export const isEndingSandboxStep = derived(
	[currentStoryStep],
	([$currentStoryStep]) => $currentStoryStep.isEndingSandboxStep
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

export const loveSongTypeToShowInProgressBar = storySteps.map(
	(step, stepIndex) =>
		step.typeToShowInProgressBar ||
		spotlightedLoveSongType(step) ||
		spotlightedLoveSongType(storySteps[Math.abs(stepIndex - 1)])
);

export const precedingStepSpotlightedType = derived(
	[currentStoryStepIndex],
	([$currentStoryStepIndex]) =>
		spotlightedLoveSongType(storySteps[$currentStoryStepIndex - 1])
);

export const showSearchBars = derived(
	[aSingleLoveSongTypeIsSpotlighted, viewport, isEndingSandboxStep],
	([$aSingleLoveSongTypeIsSpotlighted, $viewport, $isEndingSandboxStep]) =>
		!$viewport.isLikelyInMobileLandscape &&
		($aSingleLoveSongTypeIsSpotlighted || $isEndingSandboxStep)
);

const previousViewport = previous(viewport, { width: null, height: null });

export const preventBubbleRestartBecauseTheUserIsMerelySearching = derived(
	[aSearchBarIsFocused, viewport, previousViewport],
	([$aSearchBarIsFocused, $viewport, $previousViewport]) => {
		// Special case: viewport is adjusted without un-focusing the search bar
		if (
			$previousViewport.width !== $viewport.width ||
			$previousViewport.height !== $viewport.height
		) {
			return false;
		}
		// Otherwise, return the value of $aSearchBarIsFocused
		return $aSearchBarIsFocused;
	}
);
