import { derived } from "svelte/store";

import { scaleLinear } from "d3";
import seedrandom from "seedrandom";

import mq from "./mq";

import {
	currentStoryStep,
	isEndingSandboxStep,
	showSearchBars
} from "./storySteps";
import viewport from "./viewport";
import {
	getXPositionFromTime,
	getYPercentageForSong,
	getYPositionInSnakeChart
} from "./forcePositionOptions-helper";

import {
	songInAnnotations,
	songInManuallySetPositions
} from "$data/data-utils";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
// TODO: should this be a store, too?
import { STORY_STEP_CONTROLLER_TOP_PADDING } from "$components/viz/viz-utils";
import { MAX_DATE, MIN_DATE } from "$data/songs-data";

const Y_MARGIN_SCREEN_PERCENTAGE = 0.05;
export const baseYTopMargin = derived(
	[viewport],
	([$viewport]) => $viewport.height * Y_MARGIN_SCREEN_PERCENTAGE
);
const yMarginBottom = derived(
	[baseYTopMargin],
	([$baseYTopMargin]) => $baseYTopMargin * 1.2 // needs a little extra space
);
export const bottomOfStoryText = derived(
	[baseYTopMargin],
	([$baseYTopMargin]) => $baseYTopMargin + STORY_STEP_CONTROLLER_TOP_PADDING
);
const SEARCH_BAR_HEIGHT = 70; // TODO: maybe export to style dictionary, we can relate it to --search-bar-height
const yMarginTop = derived(
	[baseYTopMargin, isEndingSandboxStep, showSearchBars],
	([$baseYTopMargin, $isEndingSandboxStep, $showSearchBars]) =>
		$baseYTopMargin +
		($isEndingSandboxStep && $showSearchBars ? SEARCH_BAR_HEIGHT : 0)
);
const X_MARGIN = 48; // This margin must accommodate the left/right nav arrows (Tap element)
const X_MARGIN_MOBILE = {
	left: 42, // For some reason, the viz seems to extend slightly further on the left side, so this gives it space (ie to avoid an iPhone camera occluding it)
	right: 40
};
export const margins = derived(
	[yMarginTop, yMarginBottom, mq],
	([$yMarginTop, $yMarginBottom, $mq]) => ({
		top: $yMarginTop,
		bottom: $yMarginBottom,
		right: $mq.desktop ? X_MARGIN : X_MARGIN_MOBILE.right,
		left: $mq.desktop ? X_MARGIN : X_MARGIN_MOBILE.left
	})
);

const xScaleSansRange = scaleLinear().domain([MIN_DATE, MAX_DATE]);
const xScaleJustAddRange = (canvasWidth, $margins) =>
	xScaleSansRange.range([$margins.left, canvasWidth - $margins.right]);

export const getXPositionForYear = derived(
	[viewport, margins],
	([$viewport, $margins]) => {
		return (year) => xScaleJustAddRange($viewport.width, $margins)(year);
	}
);

export const calculateXForcePosition = derived(
	[viewport, currentStoryStep, getXPositionForYear],
	([$viewport, $currentStoryStep, $getXPositionForYear]) => {
		const { width } = $viewport;
		const { calculateXForcePosition } = $currentStoryStep.visualEncodings;
		// In this case, we need a store, which we aren't able to provide in the storySteps file, so we just inject it here
		if (calculateXForcePosition === getXPositionFromTime) {
			return ({ song }) =>
				$getXPositionForYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);
		}
		return ({ song }, index) =>
			calculateXForcePosition(song, width, undefined, index);
	}
);
export const getYPositionForPercentage = derived(
	[viewport, margins],
	([$viewport, $margins]) =>
		(percentage) => {
			const yStart = $margins.top + STORY_STEP_CONTROLLER_TOP_PADDING;
			const yRange =
				$viewport.height -
				STORY_STEP_CONTROLLER_TOP_PADDING -
				$margins.top -
				$margins.bottom;
			return yStart + percentage * yRange;
		}
);

const __getYPositionInSnakeChart = (
	song,
	canvasHeight,
	$loveSongsLabeledByTimeRegionPercentageForPosition,
	songIndex,
	songAnnotations,
	manuallySetPositions,
	// we passed this in:
	$getYPositionForPercentage
) => {
	const annotatedSong = songInAnnotations(song, songAnnotations);
	const manuallySetSong = songInManuallySetPositions(
		song,
		manuallySetPositions
	);
	const yPercent =
		(annotatedSong && annotatedSong.yPercent) ||
		(manuallySetSong && manuallySetSong.yPercent);
	if (!!yPercent || yPercent === 0) {
		return $getYPositionForPercentage(yPercent);
	}

	const { y0, y1 } =
		getYPercentageForSong(
			song,
			$loveSongsLabeledByTimeRegionPercentageForPosition
		) || {};

	const base = y1;
	// While positions appear random to the unsuspecting user, by using each song's index as its own random seed, we effectively create
	// a "database" of sorts that will always return the same "randomized" position for each song, without having to send/store 5000+ positions
	const randomPositionWithinBand = seedrandom(songIndex)() * (y0 - y1);
	return $getYPositionForPercentage(base + randomPositionWithinBand);
};

export const calculateYForcePosition = derived(
	[currentStoryStep, getYPositionForPercentage],
	([$currentStoryStep, $getYPositionForPercentage]) => {
		const { calculateYForcePosition } = $currentStoryStep.visualEncodings;

		if (calculateYForcePosition === getYPositionInSnakeChart) {
			return (...args) =>
				__getYPositionInSnakeChart(...args, $getYPositionForPercentage);
		}

		return calculateYForcePosition;
	}
);