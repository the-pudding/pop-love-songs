import {
	SONG_DATA_COLUMNS_ENUM,
	LOVE_SONG_TYPE_COLOR_MAP,
	LOVE_SONG_TYPE_BAND_LEVEL_MAP
} from "$data/data-constants.js";

const YEAR_MAX = 2022;
const YEAR_MIN = 1958;
const DOMAIN = YEAR_MAX - YEAR_MIN;

const Y_MARGIN = 50;
export const X_RIGHT_MARGIN = 280; // TODO: probably a better way to do this *shrug*

export const getXPositionFromTime = (song, canvasWidth) => {
	const xPercentage =
		(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal] - YEAR_MIN) / DOMAIN;
	return xPercentage * (canvasWidth - X_RIGHT_MARGIN);
};

// TODO: use d3 scale to determine band
export const getYTargetPosition = (song, canvasHeight) => {
	const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
	const yPercentage =
		LOVE_SONG_TYPE_BAND_LEVEL_MAP[loveSongType] /
		Object.keys(LOVE_SONG_TYPE_BAND_LEVEL_MAP).length;
	return 2 * Y_MARGIN + yPercentage * (canvasHeight - 2 * Y_MARGIN);
};

const RADIUS_SCALING_FACTOR = 2;
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

export const songIsSelected = (song, searchAndFilter) => {
	const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];

	const genreSelected =
		searchAndFilter.selectedGenres.includes(
			song[SONG_DATA_COLUMNS_ENUM.generic_genre]
		) || searchAndFilter.selectedGenres.length === 0;
	const loveSongTypeSelected =
		searchAndFilter.selectedLoveSongTypes.includes(loveSongType) ||
		searchAndFilter.selectedLoveSongTypes.length === 0;
	const performerSelected =
		searchAndFilter.performerSearchString.length === 0 ||
		song[SONG_DATA_COLUMNS_ENUM.performer]
			.toLowerCase()
			.includes(searchAndFilter.performerSearchString.toLowerCase());
	const songSelected =
		searchAndFilter.songSearchString.length === 0 ||
		song[SONG_DATA_COLUMNS_ENUM.song]
			.toLowerCase()
			.includes(searchAndFilter.songSearchString.toLowerCase());

	return (
		genreSelected && loveSongTypeSelected && performerSelected && songSelected
	);
};

// TEMP for research

export const searchSongOnYouTube = (song) => {
	const youtubeSearchURL = `https://www.youtube.com/results?search_query=${
		song[SONG_DATA_COLUMNS_ENUM.song]
	}+by+${song[SONG_DATA_COLUMNS_ENUM.performer]}`.replace(" ", "+");

	window.open(youtubeSearchURL, "_blank");
};
