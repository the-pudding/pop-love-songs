import { derived } from "svelte/store";
import viewport from "./viewport.js";
import songsData from "$data/songs-data.js";
import { songInAnnotations } from "$data/data-utils.js";
import { currentStoryStep } from "./storySteps.js";
import { loveSongsLabeledByTimeRegionPercentageForPosition } from "./loveSongsLabeledByTimeRegionPercentageForPosition.js";
import {
	LOVE_SONG_TYPE_COLOR_MAP,
	LOVE_SONG_TYPE_CONSTANTS,
	SONG_DATA_COLUMNS_ENUM,
	UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";
import { typesTreatedAsNonLoveSongs } from "./searchAndFilter.js";

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

// Annotations with position
export const songAnnotationsWithPosition = derived(
	[yForcePosition, xForcePosition, currentStoryStep],
	([$yForcePosition, $xForcePosition, $currentStoryStep]) =>
		songsData.reduce((accum, { song }, index) => {
			// if song is in annotations, add its position
			if (
				songInAnnotations(
					song,
					$currentStoryStep.visualEncodings.songAnnotations
				)
			) {
				return [
					...accum,
					{
						song,
						x: $xForcePosition[index],
						y: $yForcePosition[index]
					}
				];
			} else {
				return accum;
			}
		}, [])
);

// Color

const updateColorMap = (
	typesTreatedAsNonLoveSongs,
	colorMap,
	colorButDontSeperateThisLoveSongType = null
) =>
	Object.keys(colorMap).reduce(
		(updatedColors, loveSongType) => ({
			...updatedColors,
			[loveSongType]:
				typesTreatedAsNonLoveSongs.includes(+loveSongType) &&
				+loveSongType !== colorButDontSeperateThisLoveSongType // special case: differentiate spatially not color-wise
					? colorMap[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]
					: colorMap[loveSongType]
		}),
		{}
	);

export const loveSongTypeColorMap = derived(
	[typesTreatedAsNonLoveSongs, currentStoryStep],
	([$typesTreatedAsNonLoveSongs, $currentStoryStep]) =>
		updateColorMap(
			$typesTreatedAsNonLoveSongs,
			LOVE_SONG_TYPE_COLOR_MAP,
			$currentStoryStep.visualEncodings.colorButDontSeperateThisLoveSongType
		)
);

export const unselectedLoveSongTypeColorMap = derived(
	[typesTreatedAsNonLoveSongs],
	([$typesTreatedAsNonLoveSongs]) =>
		updateColorMap(
			$typesTreatedAsNonLoveSongs,
			UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
		)
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
