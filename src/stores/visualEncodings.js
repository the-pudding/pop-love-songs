import { derived } from "svelte/store";
import viewport from "./viewport.js";
import songsData from "$data/songs-data.js";
import { currentStoryStep } from "./storySteps.js";
import { loveSongsLabeledByTimeRegionPercentageForPosition } from "./loveSongsLabeledByTimeRegionPercentageForPosition.js";
import {
	LOVE_SONG_TYPE_COLOR_MAP,
	LOVE_SONG_TYPE_CONSTANTS,
	UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";

// Position (or the force layout that guides it)

export const xForcePosition = derived(
	[viewport, currentStoryStep],
	([$viewport, $currentStoryStep]) => {
		const { width } = $viewport;
		const { calculateXForcePosition } = $currentStoryStep.visualEncodings;
		return songsData.map(({ song }) => calculateXForcePosition(song, width));
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
		return songsData.map(({ song }) =>
			calculateYForcePosition(
				song,
				height,
				$loveSongsLabeledByTimeRegionPercentageForPosition
			)
		);
	}
);

// Size

// Color

const updateColorMap = (typesTreatedAsNonLoveSongs, colorMap) =>
	Object.keys(colorMap).reduce(
		(updatedColors, loveSongType) => ({
			...updatedColors,
			[loveSongType]: typesTreatedAsNonLoveSongs.includes(+loveSongType)
				? colorMap[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]
				: colorMap[loveSongType]
		}),
		{}
	);

export const loveSongTypeColorMap = derived(
	[currentStoryStep],
	([$currentStoryStep]) =>
		updateColorMap(
			$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs,
			LOVE_SONG_TYPE_COLOR_MAP
		)
);

export const unselectedLoveSongTypeColorMap = derived(
	[currentStoryStep],
	([$currentStoryStep]) =>
		updateColorMap(
			$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs,
			UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
		)
);
