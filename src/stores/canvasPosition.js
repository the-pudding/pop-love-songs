import { derived } from "svelte/store";

import seedrandom from "seedrandom";

import { currentStoryStep } from "./storySteps";
import viewport from "./viewport";
import {
	getXPositionFromTime,
	getYPercentageForSong,
	getYPositionInSnakeChart
} from "./forcePositionOptions-helper";

import {
	songInAnnotations,
	songInManuallySetPositions,
	xScaleJustAddRange
} from "$data/data-utils";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
// TODO: should this be a store, too?
import { STORY_STEP_CONTROLLER_TOP_PADDING } from "$components/viz/viz-utils";

export const getXPositionForYear = derived([viewport], ([$viewport]) => {
	return (year) => xScaleJustAddRange($viewport.width)(year);
});

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

// TODO: will be its own, responsive store (delete the one currently being exported elsewhere)
const Y_MARGIN_SCREEN_PERCENTAGE = 0.05;
export const getYPositionForPercentage = derived(
	[viewport],
	([$viewport]) =>
		(percentage) => {
			const yStart =
				$viewport.height * Y_MARGIN_SCREEN_PERCENTAGE +
				STORY_STEP_CONTROLLER_TOP_PADDING;
			const yRange =
				$viewport.height -
				STORY_STEP_CONTROLLER_TOP_PADDING -
				2 * $viewport.height * Y_MARGIN_SCREEN_PERCENTAGE;
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