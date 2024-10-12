import { derived } from "svelte/store";
import viewport from "./viewport.js";
import songsData from "$data/songs-data.js";
import { getArrayOfPerformers, songInAnnotations } from "$data/data-utils.js";
import { currentStoryStep } from "./storySteps.js";
import { loveSongsLabeledByTimeRegionPercentageForPosition } from "./loveSongsLabeledByTimeRegionPercentageForPosition.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { nodePositionsInSimulation } from "./simulation.js";
import previous from "./previous.js";
import {
	calculateXForcePosition,
	calculateYForcePosition
} from "./canvasPosition.js";
import {
	previewedPerformer,
	previewedSong,
	selectedPerformers,
	selectedSong
} from "./searchAndFilter.js";
import { visibleSongsData } from "./dataDerivations.js";

const xForcePositionUnoptimized = derived(
	calculateXForcePosition,
	($calculateXForcePosition) => {
		return songsData.map($calculateXForcePosition);
	}
);

const yForcePositionUnoptimized = derived(
	[
		viewport,
		currentStoryStep,
		loveSongsLabeledByTimeRegionPercentageForPosition,
		calculateYForcePosition
	],
	([
		$viewport,
		$currentStoryStep,
		$loveSongsLabeledByTimeRegionPercentageForPosition,
		$calculateYForcePosition
	]) => {
		const { height } = $viewport;
		const { songAnnotations, manuallySetPositions } =
			$currentStoryStep.visualEncodings;
		return songsData.map(({ song }, index) =>
			$calculateYForcePosition(
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
const substantiallyDifferent = (a, b) => Math.abs(a - b) > EPSILON;

// Note: when arrays change, the REALLY change, so we're only checking the first chunk of the array
const LENGTH_TO_CHECK = Math.floor(0.4 * songsData.length);
const TOLERATED_DIFFERENCES = 4;
const arraysDifferMeaningfully = (a, b) => {
	let differencesFound = 0;
	for (let i = 0; i < LENGTH_TO_CHECK; i++) {
		if (substantiallyDifferent(a[i], b[i])) {
			differencesFound++;
			if (differencesFound > TOLERATED_DIFFERENCES) {
				return true;
			}
		}
	}

	return false;
};

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
		}
	}
);

export const songRadius = derived([viewport], ([$viewport]) => {
	const { width, height, isLikelyInMobileLandscape } = $viewport;
	const roughArea = width * height;
	// TODO: there may be a better or more sophisticated way of doing this
	// Basically, smaller screens need slightly smaller circles to fit everything, it seems
	const ADJUSTER = isLikelyInMobileLandscape ? 0.023 : 0.03; // for "total weeks in top 10 (regardless of rank)"
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

export const selectedSongWithMetadata = derived(
	[nodePositionsInSimulation, previewedSong, selectedSong, songRadius],
	([
		$nodePositionsInSimulation,
		$previewedSong,
		$selectedSong,
		$songRadius
	]) => {
		const { song, songIndex } = $selectedSong.song
			? $selectedSong
			: $previewedSong;
		if (song && $nodePositionsInSimulation) {
			const x = $nodePositionsInSimulation[songIndex].x;
			const y = $nodePositionsInSimulation[songIndex].y;
			return {
				song,
				x,
				y,
				circleX: x,
				circleY: y,
				circleRadius: $songRadius[songIndex]
			};
		} else {
			return {};
		}
	}
);

export const previewedPerformersWithMetadata = derived(
	[
		visibleSongsData,
		nodePositionsInSimulation,
		selectedPerformers,
		previewedPerformer,
		songRadius
	],
	([
		$visibleSongsData,
		$nodePositionsInSimulation,
		$selectedPerformers,
		$previewedPerformer,
		$songRadius
	]) => {
		if (
			!$nodePositionsInSimulation ||
			!($previewedPerformer || $selectedPerformers.length)
		) {
			return [];
		}

		const performers = [...$selectedPerformers, $previewedPerformer].filter(
			(performer) => !!performer
		);

		return $visibleSongsData.reduce((accum, { song, songIndex }) => {
			const songPerformers = getArrayOfPerformers(song);
			const matchingPerformer = songPerformers.some((performer) =>
				performers.includes(performer)
			);
			if (matchingPerformer) {
				accum.push({
					song,
					circleX: $nodePositionsInSimulation[songIndex].x,
					circleY: $nodePositionsInSimulation[songIndex].y,
					circleRadius: $songRadius[songIndex]
				});
			}
			return accum;
		}, []);
	}
);