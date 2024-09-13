import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { STORY_STEP_CONTROLLER_TOP_PADDING } from "$components/viz/viz-utils";
import {
	getXPosForYear,
	songInAnnotations,
	X_MARGIN,
	Y_MARGIN_SCREEN_PERCENTAGE
} from "$data/data-utils";

export const DEFAULT_Y_ENTRANCE_POSITION = 0;

/*
 * All functions take in song and a canvas width and returns a position
 */

// --- xForcePosition options ---

export const getXPositionFromTime = (song, canvasWidth) =>
	getXPosForYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal], canvasWidth);

// --- yForcePosition options ---

const getPercentageForSong = (
	song,
	$loveSongsLabeledByTimeRegionPercentageForPosition
) => {
	const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
	const timeRegion = $loveSongsLabeledByTimeRegionPercentageForPosition.find(
		(timeRegion) =>
			Math.ceil(songYear) >= timeRegion.start &&
			Math.floor(songYear) <= timeRegion.stop
	);
	if (!timeRegion) {
		console.warn(
			"Song falls outside set time regions:",
			song,
			$loveSongsLabeledByTimeRegionPercentageForPosition
		);
		return 0.5;
	}

	const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
	return timeRegion.popularityScoreSumsInTimeRegion[loveSongType];
};

export const getYPosForPercentage = (percentage, canvasHeight) => {
	const yStart =
		canvasHeight * Y_MARGIN_SCREEN_PERCENTAGE +
		STORY_STEP_CONTROLLER_TOP_PADDING;
	const yRange =
		canvasHeight -
		STORY_STEP_CONTROLLER_TOP_PADDING -
		2 * canvasHeight * Y_MARGIN_SCREEN_PERCENTAGE;
	return yStart + percentage * yRange;
};

const TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE = 0.008;
export const getYPosInAggregateSnakeChart = ({
	percentage,
	percentageChange,
	canvasHeight,
	isY0
}) =>
	getYPosForPercentage(
		percentage +
			(isY0 || percentageChange < 2 * TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE
				? 0
				: TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE),
		canvasHeight
	);

// TODO: what I really want is a random number for each song, that is the same each time.
// I'm not sure why "seeding" it with the index didn't work (seemed to just do nothing)
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function sfc32(a, b, c, d) {
	return function () {
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		let t = (((a + b) | 0) + d) | 0;
		d = (d + 1) | 0;
		a = b ^ (b >>> 9);
		b = (c + (c << 3)) | 0;
		c = (c << 21) | (c >>> 11);
		c = (c + t) | 0;
		return (t >>> 0) / 4294967296;
	};
}

const seededRandom = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, 0x85ae67bb);

export const getYPositionInSnakeChart = (
	song,
	canvasHeight,
	$loveSongsLabeledByTimeRegionPercentageForPosition
) => {
	const { y0, y1 } =
		getPercentageForSong(
			song,
			$loveSongsLabeledByTimeRegionPercentageForPosition
		) || {};
	
	const base = y1;
	const randomPositionWithinBand = seededRandom() * (y0 - y1);
	return getYPosForPercentage(base + randomPositionWithinBand, canvasHeight);
};

// x and y

export const fractionOfScreenFactory =
	(fraction = 0.5, randomVariance = 0.05) =>
	(song, canvasWidthOrHeight) => {
		const range = canvasWidthOrHeight - 2 * X_MARGIN;
		const randomOffset = range * randomVariance * (Math.random() - 1);
		return randomOffset + X_MARGIN + fraction * range;
	};

// Create an unchanging array of random positions for each song, since it should stay constant accros the story

// I know... weird place to put this, but trust me: it was the simplest solution
export const SERENADE_HIGHLIGHTS_FROM_INTRO = [
	{
		song: "Happy Together",
		year: 1967,
		xPercent: 0.9,
		yPercent: 0.5,
		rightAlign: true
	},
	{ song: "Love Song", year: 1989, xPercent: 0.1, yPercent: 0.7 },
	{ song: "No One", year: 2007, xPercent: 0.5, yPercent: 0.8 },
	{ song: "Perfect", year: 2017, xPercent: 0.4, yPercent: 0.6 }
];
export const NON_SERENADE_HIGHLIGHTS_FROM_INTRO = [
	{ song: "Day Tripper", year: 1966, xPercent: 0.1, yPercent: 0.6 },
	{
		song: "Thriller",
		year: 1984,
		xPercent: 0.8,
		yPercent: 0.4,
		rightAlign: true
	},
	{ song: "If I Were A Boy", year: 2008, xPercent: 0.5, yPercent: 0.55 },
	{ song: "Kiss Me More", year: 2021, xPercent: 0.4, yPercent: 0.8 }
];

const ALL_HIGHLIGHTS_FROM_INTRO = [
	...SERENADE_HIGHLIGHTS_FROM_INTRO,
	...NON_SERENADE_HIGHLIGHTS_FROM_INTRO
];

const RANDOM_X_POSITIONS = songsData.map(({ song }) => {
	if (songInAnnotations(song, ALL_HIGHLIGHTS_FROM_INTRO)) {
		const { xPercent } = ALL_HIGHLIGHTS_FROM_INTRO.find(
			({ song: songName }) => songName === song[SONG_DATA_COLUMNS_ENUM.song]
		);
		return xPercent;
	}
	return Math.random();
});
const RANDOM_Y_POSITIONS = songsData.map(({ song }) => {
	if (songInAnnotations(song, ALL_HIGHLIGHTS_FROM_INTRO)) {
		const { yPercent } = ALL_HIGHLIGHTS_FROM_INTRO.find(
			({ song: songName }) => songName === song[SONG_DATA_COLUMNS_ENUM.song]
		);
		return yPercent;
	}
	return Math.random();
});

export const randomXDistribution = (song, canvasWidthOrHeight, _, index) =>
	RANDOM_X_POSITIONS[index] * canvasWidthOrHeight;
export const randomYDistribution = (song, canvasWidthOrHeight, _, index) =>
	RANDOM_Y_POSITIONS[index] * canvasWidthOrHeight;
