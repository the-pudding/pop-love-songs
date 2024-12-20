import { derived } from "svelte/store";

import { typesTreatedAsNonLoveSongs } from "./searchAndFilter";
import { currentStoryStep } from "./storySteps";

import {
	ACCESSIBLY_CONTRASTING_COLOR_MAP,
	LOVE_SONG_TYPE_COLOR_MAP,
	LOVE_SONG_TYPE_CONSTANTS,
	LOVE_SONG_TYPES,
	SONG_DATA_COLUMNS_ENUM,
	UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";
import { getSnakeFill } from "$components/viz/viz-utils";

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
			// Slight hack: In order to get a smooth interpolation to un-selected in next slide, we use un-selected (regular) color map the slide before we fade out non-love songs (while fading in Serenade)
			$currentStoryStep.showTotalWeeksInTop10InSongInfo
				? LOVE_SONG_TYPE_COLOR_MAP
				: UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP,
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

// All this: produces an store for calculating all possible song colors and returning a tween-able (and accessible) version of them

const getColorKey = (loveSongType, isSelected) =>
	`${loveSongType}-${isSelected}`;

const convertColorMapToDictionary = (colorMap, isSelected) =>
	Object.keys(colorMap).reduce(
		(accum, loveSongType) => ({
			...accum,
			[getColorKey(loveSongType, isSelected)]: hexToRgbaArray(
				colorMap[loveSongType]
			)
		}),
		{}
	);

export const songColor = derived(
	[loveSongTypeColorMap, unselectedLoveSongTypeColorMap],
	([$loveSongTypeColorMap, $unselectedLoveSongTypeColorMap]) => {
		// Step 1: create a master dictionary, songKey -> rgbaColor, using both selected and non-selected color maps
		const songColorDict = {
			...convertColorMapToDictionary($loveSongTypeColorMap, true),
			...convertColorMapToDictionary($unselectedLoveSongTypeColorMap, false)
		};
		// Step 2: from songColorDict, create both an array of all the songColorDict values and a dictionary of colorKey => index for that array
		const { songColorArrayToInterpolate, colorKeyToIndex } = Object.entries(
			songColorDict
		).reduce(
			(accum, [colorKey, colorValue], index) => {
				accum.songColorArrayToInterpolate.push(colorValue);
				accum.colorKeyToIndex[colorKey] = index;
				return accum;
			},
			{ songColorArrayToInterpolate: [], colorKeyToIndex: {} }
		);
		const getColor = (song, isSelected, interpolatedSongColors) =>
			interpolatedSongColors[
				colorKeyToIndex[
					getColorKey(
						song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
						isSelected
					)
				]
			];

		return {
			songColorArrayToInterpolate,
			getColor
		};
	},
	[]
);

// end of songColor

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
