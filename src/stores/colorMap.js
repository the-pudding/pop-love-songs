import { derived } from "svelte/store";
import songsData from "$data/songs-data.js";

import { typesTreatedAsNonLoveSongs } from "./searchAndFilter";
import { currentStoryStep } from "./storySteps";
import { songIsSelected } from "./dataDerivations";

import {
	LOVE_SONG_TYPE_COLOR_MAP,
	LOVE_SONG_TYPE_CONSTANTS,
	UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";
import { getSongColor } from "$components/viz/viz-utils";

const updateColorMap = (
	typesTreatedAsNonLoveSongs,
	colorMap,
	colorButDontSeperateThisLoveSongType = null,
	isFinalComparisonStep = false
) => {
	if (isFinalComparisonStep) {
		// color all love songs the same color, for easier visual comparison against non love songs
		const SHARED_COLOR = colorMap[LOVE_SONG_TYPE_CONSTANTS.serenade];
		return Object.keys(colorMap).reduce(
			(updatedColors, loveSongType) => ({
				...updatedColors,
				[loveSongType]:
					+loveSongType === +LOVE_SONG_TYPE_CONSTANTS.notALoveSong
						? colorMap[loveSongType]
						: SHARED_COLOR
			}),
			{}
		);
	}

	return Object.keys(colorMap).reduce(
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
};

export const loveSongTypeColorMap = derived(
	[typesTreatedAsNonLoveSongs, currentStoryStep],
	([$typesTreatedAsNonLoveSongs, $currentStoryStep]) =>
		updateColorMap(
			$typesTreatedAsNonLoveSongs,
			LOVE_SONG_TYPE_COLOR_MAP,
			$currentStoryStep.visualEncodings.colorButDontSeperateThisLoveSongType,
			$currentStoryStep.isFinalComparisonStep
		)
);

export const unselectedLoveSongTypeColorMap = derived(
	[typesTreatedAsNonLoveSongs, currentStoryStep],
	([$typesTreatedAsNonLoveSongs, $currentStoryStep]) =>
		updateColorMap(
			$typesTreatedAsNonLoveSongs,
			UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP,
			$currentStoryStep.visualEncodings.colorButDontSeperateThisLoveSongType,
			$currentStoryStep.isFinalComparisonStep
		)
);

export const songColor = derived(
	[songIsSelected, loveSongTypeColorMap, unselectedLoveSongTypeColorMap],
	([$songIsSelected, $loveSongTypeColorMap, $unselectedLoveSongTypeColorMap]) =>
		songsData.map(({ song }, index) =>
			getSongColor(
				song,
				$songIsSelected[index],
				$loveSongTypeColorMap,
				$unselectedLoveSongTypeColorMap
			)
		),
	[]
);
