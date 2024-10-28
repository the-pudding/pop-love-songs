import { derived } from "svelte/store";
import songsData from "$data/songs-data.js";

import { typesTreatedAsNonLoveSongs } from "./searchAndFilter";
import { currentStoryStep } from "./storySteps";
import { songIsSelected } from "./dataDerivations";

import {
	ACCESSIBLY_CONTRASTING_COLOR_MAP,
	LOVE_SONG_TYPE_COLOR_MAP,
	LOVE_SONG_TYPE_CONSTANTS,
	LOVE_SONG_TYPES,
	UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";
import { getSnakeFill, getSongColor } from "$components/viz/viz-utils";

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

export const accessiblyContrastingColorMap = derived(
	[typesTreatedAsNonLoveSongs, currentStoryStep],
	([$typesTreatedAsNonLoveSongs, $currentStoryStep]) =>
		updateColorMap(
			$typesTreatedAsNonLoveSongs,
			ACCESSIBLY_CONTRASTING_COLOR_MAP,
			$currentStoryStep.visualEncodings.colorButDontSeperateThisLoveSongType,
			$currentStoryStep.isFinalComparisonStep
		)
);

// Now calculate song color in a numeric rgba representation that Svelte can easily interpolate between
// (for some reason, it broke when I tried to interpolate using d3.interpolateRgb, and was unable to properly work with an array of values, only a single value)

const hexToRgbaArray = (hex) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
	return [r, g, b, a];
};

export const rgbaArrayToString = (rgbaArray) =>
	`rgba(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]}, ${rgbaArray[3]})`;

// OPTIMIZATION: Currently, we're creating a a 5k-length array matching the every individual song.
// However, there are only 8 colors * 2 (selected/unselected) = 16 unique colors.
// So we could optimize this by creating a 16-length length array, then provide a lookup dictionary where the key is `${loveSongType}-${isSelected}` 
// and the value is the index in the 16 - length color array. Interpolating 16 values should be much faster than 5k values.
export const songColor = derived(
	[songIsSelected, loveSongTypeColorMap, unselectedLoveSongTypeColorMap],
	([$songIsSelected, $loveSongTypeColorMap, $unselectedLoveSongTypeColorMap]) =>
		songsData.map(({ song }, index) => {
			const hex = getSongColor(
				song,
				$songIsSelected[index],
				$loveSongTypeColorMap,
				$unselectedLoveSongTypeColorMap
			);
			return hexToRgbaArray(hex);
		}),
	[]
);

export const snakeFill = derived(
	[currentStoryStep, loveSongTypeColorMap, unselectedLoveSongTypeColorMap],
	([
		$currentStoryStep,
		$loveSongTypeColorMap,
		$unselectedLoveSongTypeColorMap
	]) =>
		LOVE_SONG_TYPES.reduce(
			(acc, loveSongType) => ({
				...acc,
				[loveSongType]: hexToRgbaArray(
					getSnakeFill(
						loveSongType,
						$currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(
							loveSongType
						),
						$loveSongTypeColorMap,
						$unselectedLoveSongTypeColorMap
					)
				)
			}),
			{}
		)
);
