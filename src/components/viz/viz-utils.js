import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";

export const STORY_STEP_CONTROLLER_BOTTOM_PADDING = 100;

const NEXT_COLOR_STEP = 1; // keep this as 1
const BASE_OFFSET = 10;

export const getInvisibleFillFromSongIndex = (songIndex) => {
	const uniqueColorOffset = BASE_OFFSET + songIndex * NEXT_COLOR_STEP;
	const MAX_COLOR = 16777215; // 256^3 - 1, as RGB color max value is 255 for each channel
	if (uniqueColorOffset > MAX_COLOR) {
		console.error(
			`Too many songs to assign unique colors with a step size ${NEXT_COLOR_STEP}`
		);
	}

	const rgb = [];
	rgb.push(uniqueColorOffset & 0xff); // R.
	rgb.push((uniqueColorOffset >> 8) & 0xff); // G.
	rgb.push((uniqueColorOffset >> 16) & 0xff); // B.
	return `rgb(${rgb.join(",")})`;
};

export const getSongIndexFromInvisibleFill = (
	invisibleContext,
	offsetX,
	offsetY
) => {
	const { data } = invisibleContext.getImageData(offsetX, offsetY, 1, 1);
	const r = data[0];
	const g = data[1] << 8; // shift to correct position
	const b = data[2] << 16; // shift to correct position
	// If all the values are zero, it's the background, so return null
	if (r === 0 && g === 0 && b === 0) {
		return null;
	}
	// Reconstruct the rgb hex value
	const rgbHex = r | g | b;
	// Convert to a song index
	const songIndex = (rgbHex - BASE_OFFSET) / NEXT_COLOR_STEP;
	return songIndex < 0 ? null : songIndex;
};

export const getSongFill = (
	song,
	songIsSelected,
	$loveSongTypeColorMap,
	$unselectedLoveSongTypeColorMap
) => {
	const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
	return songIsSelected
		? $loveSongTypeColorMap[loveSongType]
		: $unselectedLoveSongTypeColorMap[loveSongType];
};

export const getSnakeFill = (
	loveSongType,
	visibleButNotSelected,
	$loveSongTypeColorMap,
	$unselectedLoveSongTypeColorMap
) =>
	visibleButNotSelected
		? $unselectedLoveSongTypeColorMap[loveSongType]
		: $loveSongTypeColorMap[loveSongType];
