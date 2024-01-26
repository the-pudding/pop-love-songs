import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";

const YEAR_MAX = 2022;
const YEAR_MIN = 1958;
const DOMAIN = YEAR_MAX - YEAR_MIN;

const Y_MARGIN = 24;
export const STORY_STEP_CONTROLLER_BOTTOM_PADDING = 100; // TODO: export this & use it in viz layout

export const RIGHT_TOOLBAR_WIDTH = 280; // TODO: probably a better way to do this *shrug*
const X_MARGIN = 80;
export const getXPositionFromTime = (song, canvasWidth) => {
	const xPercentage =
		(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal] - YEAR_MIN) / DOMAIN;
	return (
		X_MARGIN + xPercentage * (canvasWidth - RIGHT_TOOLBAR_WIDTH - 2 * X_MARGIN)
	);
};

export const getYTargetPosition = (
	{ yPositionTargetPercentage },
	canvasHeight
) =>
	Y_MARGIN +
	yPositionTargetPercentage *
		(canvasHeight - (2 * Y_MARGIN + STORY_STEP_CONTROLLER_BOTTOM_PADDING));

const RADIUS_SCALING_FACTOR = 1.2; // TODO: this should probably be responsive to available screen area
export const calculateRadiusFromPopularityScore = (
	popularityScore,
	radiusScalingFactor = RADIUS_SCALING_FACTOR
) => {
	return Math.sqrt(popularityScore * radiusScalingFactor);
};

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

export const getSongFill = (song, songIsSelected) => {
	const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
	return songIsSelected
		? LOVE_SONG_TYPE_COLOR_MAP[loveSongType]
		: "rgb(0, 0, 0, 0.05)";
};

// TEMP for research

export const searchSongOnYouTube = (song) => {
	const youtubeSearchURL = `https://www.youtube.com/results?search_query=${
		song[SONG_DATA_COLUMNS_ENUM.song]
	}+by+${song[SONG_DATA_COLUMNS_ENUM.performer]}`.replace(" ", "+");

	window.open(youtubeSearchURL, "_blank");
};
