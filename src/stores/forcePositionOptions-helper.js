import seedrandom from "seedrandom";

import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { STORY_STEP_CONTROLLER_TOP_PADDING } from "$components/viz/viz-utils";
import {
	getXPosForYear,
	songInAnnotations,
	songInManuallySetPositions,
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

export const TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE = 0.008;
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
	$loveSongsLabeledByTimeRegionPercentageForPosition,
	songIndex,
	songAnnotations,
	manuallySetPositions
) => {
	const annotatedSong = songInAnnotations(song, songAnnotations);
	const manuallySetSong = songInManuallySetPositions(
		song,
		manuallySetPositions
	);
	const yPercent =
		(annotatedSong && annotatedSong.yPercent) ||
		(manuallySetSong && manuallySetSong.yPercent);
	if (yPercent) {
		return getYPosForPercentage(annotatedSong.yPercent, canvasHeight);
	}

	const { y0, y1 } =
		getPercentageForSong(
			song,
			$loveSongsLabeledByTimeRegionPercentageForPosition
		) || {};

	const base = y1;
	// While positions appear random to the unsuspecting user, by using each song's index as its own random seed, we effectively create
	// a "database" of sorts that will always return the same "randomized" position for each song, without having to send/store 5000+ positions
	const randomPositionWithinBand = seedrandom(songIndex)() * (y0 - y1);
	return getYPosForPercentage(base + randomPositionWithinBand, canvasHeight);
};

// Create an unchanging array of random positions for each song, since it should stay constant accros the story

// I know... weird place to put this, but trust me: it was the simplest solution
const SERENADE_HIGHLIGHTS_FROM_INTRO = [
	{
		song: "Happy Together",
		year: 1967,
		xPercent: 0.8,
		yPercent: 0.35,
		rightAlign: true,
		audioFile: "happy-together"
	},
	{
		song: "Love Song",
		year: 1989,
		xPercent: 0.1,
		yPercent: 0.85,
		audioFile: "love-song"
	},
	{
		song: "No One",
		year: 2007,
		xPercent: 0.75,
		yPercent: 0.8,
		audioFile: "no-one"
	},
	{
		song: "Perfect",
		year: 2017,
		xPercent: 0.2,
		yPercent: 0.6,
		audioFile: "perfect"
	}
];
const SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD = [
	{
		song: "Happy Together",
		year: 1967,
		xPercent: 0.9,
		leftAlign: true
	},
	{ song: "Love Song", year: 1989, xPercent: 0.1 },
	{ song: "No One", year: 2007, xPercent: 0.5 }
	// { song: "Perfect", year: 2017, xPercent: 0.4, yPercent: 0.6 }
];
const NON_SERENADE_HIGHLIGHTS_FROM_INTRO = [
	{ song: "Day Tripper", year: 1966, xPercent: 0.1, yPercent: 0.6 },
	{
		song: "Thriller",
		year: 1984,
		xPercent: 0.85,
		yPercent: 0.25,
		rightAlign: true
	},
	{ song: "If I Were A Boy", year: 2008, xPercent: 0.5, yPercent: 0.55 },
	{ song: "Kiss Me More", year: 2021, xPercent: 0.4, yPercent: 0.85 }
];

export const ANNOTATION_METADATA = {
	intro: {
		manuallySetPositions: {
			...SERENADE_HIGHLIGHTS_FROM_INTRO,
			...NON_SERENADE_HIGHLIGHTS_FROM_INTRO
		},
		annotations: {
			serenadeHighlights: SERENADE_HIGHLIGHTS_FROM_INTRO,
			nonSerenadeHighlights: NON_SERENADE_HIGHLIGHTS_FROM_INTRO
		}
	},
	timelineSpread: {
		manuallySetPositions: {
			...SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD
		},
		annotations: {
			serenadeHighlights: SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD
		}
	}
};

const ALL_HIGHLIGHTS_FROM_INTRO = [
	...SERENADE_HIGHLIGHTS_FROM_INTRO,
	...NON_SERENADE_HIGHLIGHTS_FROM_INTRO
];

// This ensures the viz will always have the same "random" positions for the songs, even if you hard-refresh the page
const randomPosition = seedrandom("randomPosition");
const RANDOM_X_POSITIONS = songsData.map(({ song }) => {
	if (
		songInAnnotations(song, {
			adjacentAnnotations: ALL_HIGHLIGHTS_FROM_INTRO,
			offsetAnnotations: []
		})
	) {
		const { xPercent } = ALL_HIGHLIGHTS_FROM_INTRO.find(
			({ song: songName }) => songName === song[SONG_DATA_COLUMNS_ENUM.song]
		);
		return xPercent;
	}
	return randomPosition();
});
const RANDOM_Y_POSITIONS = songsData.map(({ song }) => {
	if (
		songInAnnotations(song, {
			adjacentAnnotations: ALL_HIGHLIGHTS_FROM_INTRO,
			offsetAnnotations: []
		})
	) {
		const { yPercent } = ALL_HIGHLIGHTS_FROM_INTRO.find(
			({ song: songName }) => songName === song[SONG_DATA_COLUMNS_ENUM.song]
		);
		return yPercent;
	}
	return randomPosition();
});

const MARGIN = 0.05;
const randomDistribution = (canvasWidthOrHeight, position) =>
	canvasWidthOrHeight * (0 + MARGIN) +
	position * canvasWidthOrHeight * (1 - MARGIN * 2);

export const randomXDistribution = (song, canvasWidthOrHeight, _, index) =>
	randomDistribution(canvasWidthOrHeight, RANDOM_X_POSITIONS[index]);
export const randomYDistribution = (song, canvasWidthOrHeight, _, index) =>
	randomDistribution(canvasWidthOrHeight, RANDOM_Y_POSITIONS[index]);
