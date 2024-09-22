import { derived } from "svelte/store";
import viewport from "./viewport.js";
import songsData from "$data/songs-data.js";
import { songInAnnotations } from "$data/data-utils.js";
import { currentStoryStep } from "./storySteps.js";
import { loveSongsLabeledByTimeRegionPercentageForPosition } from "./loveSongsLabeledByTimeRegionPercentageForPosition.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { nodePositionsInSimulation } from "./simulation.js";

// Position (or the force layout that guides it)

export const xForcePosition = derived(
	[viewport, currentStoryStep],
	([$viewport, $currentStoryStep]) => {
		const { width } = $viewport;
		const { calculateXForcePosition } = $currentStoryStep.visualEncodings;
		return songsData.map(({ song }, index) =>
			calculateXForcePosition(song, width, undefined, index)
		);
	}
);

// TODO: yForcePosition should derive from loveSongsLabeledByTimeRegionPercentageForPosition (the final data structure use for to derive snake positioning)
// By providing it (optionally), position can be easily calculated (and no need to calculate it here)
export const yForcePosition = derived(
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
		const { calculateYForcePosition } = $currentStoryStep.visualEncodings;
		return songsData.map(({ song }, index) =>
			calculateYForcePosition(
				song,
				height,
				$loveSongsLabeledByTimeRegionPercentageForPosition,
				index
			)
		);
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


