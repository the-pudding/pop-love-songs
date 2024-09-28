import { derived } from "svelte/store";
import viewport from "./viewport.js";
import songsData from "$data/songs-data.js";
import { songInAnnotations } from "$data/data-utils.js";
import { currentStoryStep } from "./storySteps.js";
import { loveSongsLabeledByTimeRegionPercentageForPosition } from "./loveSongsLabeledByTimeRegionPercentageForPosition.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { nodePositionsInSimulation } from "./simulation.js";
import previous from "./previous.js";

const xForcePositionUnoptimized = derived(
	[viewport, currentStoryStep],
	([$viewport, $currentStoryStep]) => {
		const { width } = $viewport;
		const { calculateXForcePosition } = $currentStoryStep.visualEncodings;
		return songsData.map(({ song }, index) =>
			calculateXForcePosition(song, width, undefined, index)
		);
	}
);

const yForcePositionUnoptimized = derived(
	[
		viewport,
		currentStoryStep,
		loveSongsLabeledByTimeRegionPercentageForPosition
	],
	([
		$viewport,
		$currentStoryStep,
		$loveSongsLabeledByTimeRegionPercentageForPosition
	]) => {
		const { height } = $viewport;
		const { calculateYForcePosition, songAnnotations, manuallySetPositions } =
			$currentStoryStep.visualEncodings;
		return songsData.map(({ song }, index) =>
			calculateYForcePosition(
				song,
				height,
				$loveSongsLabeledByTimeRegionPercentageForPosition,
				index,
				songAnnotations,
				manuallySetPositions
			)
		);
	}
);

export const previousXForcePosition = previous(xForcePositionUnoptimized);
export const previousYForcePosition = previous(yForcePositionUnoptimized);

const EPSILON = 0.01;
const substantiallyDifferent = (a, b) => {
	return Math.abs(a - b) > EPSILON;
};
// TODO: OPTIMIZATION: do we need to check ALL values? or just one? or just the first few?
// ... or is there like some tricky math-y thing we could do here that's really cheap/fast?
const arraysDifferMeaningfully = (a, b) =>
	a.length !== b.length ||
	a.some((x, index) => substantiallyDifferent(x, b[index]));

export const xForcePosition = derived(
	[xForcePositionUnoptimized, previousXForcePosition],
	([$xForcePositionUnoptimized, $previousXForcePosition], set) => {
		if (!$previousXForcePosition) {
			set($xForcePositionUnoptimized);
			return;
		}

		if (
			arraysDifferMeaningfully(
				$xForcePositionUnoptimized,
				$previousXForcePosition
			)
		) {
			set($xForcePositionUnoptimized);
			console.log("x SET-----------------");
		}
	}
);

export const yForcePosition = derived(
	[yForcePositionUnoptimized, previousYForcePosition],
	([$yForcePositionUnoptimized, $previousYForcePosition], set) => {
		if (!$previousYForcePosition) {
			set($yForcePositionUnoptimized);
			return;
		}

		if (
			arraysDifferMeaningfully(
				$yForcePositionUnoptimized,
				$previousYForcePosition
			)
		) {
			set($yForcePositionUnoptimized);
			console.log("y SET-----------------");
		}
	}
);

export const songRadius = derived([viewport], ([$viewport]) => {
	const { width, height } = $viewport;
	const roughArea = width * height;
	// const ADJUSTER = 0.006; // for the "11 - rank" combined metric
	const SMALL_SCREEN_SIZE_BREAKPOINT = 600000;
	// TODO: there may be a better or more sophisticated way of doing this
	const ADJUSTER = roughArea < SMALL_SCREEN_SIZE_BREAKPOINT ? 0.025 : 0.035; // for "total weeks in top 10 (regardless of rank)"
	const scalingFactor = (1 / songsData.length) * roughArea * ADJUSTER;
	return songsData.map(({ song }) =>
		Math.sqrt(
			song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10] * scalingFactor
		)
	);
});

export const songAnnotationsWithPosition = derived(
	[nodePositionsInSimulation, currentStoryStep, songRadius],
	([$nodePositionsInSimulation, $currentStoryStep, $songRadius]) =>
		songsData.reduce((accum, { song }, index) => {
			// if song is in annotations, add its position
			const songAnnotation = songInAnnotations(
				song,
				$currentStoryStep.visualEncodings.songAnnotations
			);
			if (songAnnotation && $nodePositionsInSimulation) {
				return [
					...accum,
					{
						...songAnnotation,
						song,
						x: $nodePositionsInSimulation[index].x,
						y: $nodePositionsInSimulation[index].y,
						radius: $songRadius[index]
					}
				];
			} else {
				return accum;
			}
		}, [])
);


