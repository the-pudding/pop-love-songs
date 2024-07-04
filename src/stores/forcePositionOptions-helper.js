import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { STORY_STEP_CONTROLLER_BOTTOM_PADDING } from "$components/viz/viz-utils";
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

export const getYPosForPercentage = (percentage, canvasHeight) =>
	canvasHeight * Y_MARGIN_SCREEN_PERCENTAGE +
	percentage *
		(canvasHeight -
			STORY_STEP_CONTROLLER_BOTTOM_PADDING -
			2 * canvasHeight * Y_MARGIN_SCREEN_PERCENTAGE);

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

export const getYPositionInSnakeChart = (
	song,
	canvasHeight,
	$loveSongsLabeledByTimeRegionPercentageForPosition
) =>
	getYPosForPercentage(
		getPercentageForSong(
			song,
			$loveSongsLabeledByTimeRegionPercentageForPosition
		),
		canvasHeight
	);

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
	{ song: "Happy Together", year: 1967, xPercent: 0.9, yPercent: 0.5 },
	{ song: "Love Song", year: 1989, xPercent: 0.1, yPercent: 0.2 },
	{ song: "No One", year: 2007, xPercent: 0.5, yPercent: 0.1 },
	{ song: "Perfect", year: 2017, xPercent: 0.4, yPercent: 0.6 }
];
export const NON_SERENADE_HIGHLIGHTS_FROM_INTRO = [
	{ song: "Day Tripper", year: 1966, xPercent: 0.1, yPercent: 0.6 },
	{ song: "Thriller", year: 1984, xPercent: 0.8, yPercent: 0.4 },
	{ song: "If I Were A Boy", year: 2008, xPercent: 0.5, yPercent: 0.55 },
	{ song: "Kiss Me More", year: 2021, xPercent: 0.4, yPercent: 0.2 }
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
