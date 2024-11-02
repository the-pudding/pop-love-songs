import seedrandom from "seedrandom";

import songsData from "$data/songs-data.js";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { songInAnnotations } from "$data/data-utils";

export const DEFAULT_Y_ENTRANCE_POSITION = 0;

/*
 * All functions take in song and a canvas width and returns a position
 */

// --- xForcePosition options ---

export const getXPositionFromTime =
	"this is just a placeholder, we replace it with a store when we calculate the calculateXForcePosition store";

// --- yForcePosition options ---

export const getYPercentageForSong = (
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

export const TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE = 0.008;
export const getYPosInAggregateSnakeChart = ({
	percentage,
	percentageChange,
	canvasHeight,
	isY0,
	$getYPositionForPercentage
}) =>
	$getYPositionForPercentage(
		percentage +
			(isY0 || percentageChange < 2 * TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE
				? 0
				: TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE),
		canvasHeight
	);

export const getYPositionInSnakeChart =
	"This is just a placeholder, we handle it in the store";

// Create an unchanging array of random positions for each song, since it should stay constant accros the story

// I know... weird place to put this, but trust me: it was the simplest solution
const SERENADE_HIGHLIGHTS_FROM_INTRO = [
	{
		song: "Can't Help Falling In Love",
		year: 1961,
		xPercent: 0.1,
		yPercent: 0.85,
		audioFile: "cant-help-falling-in-love"
	},
	{
		song: "Happy Together",
		year: 1967,
		xPercent: 0.8,
		yPercent: 0.35,
		rightAlign: true,
		audioFile: "happy-together",
		noWrapTitle: true
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
	// {
	// 	song: "Can't Help Falling In Love",
	// 	audioFile: "cant-help-falling-in-love",
	// 	year: 1961,
	// 	xPercent: 0.1
	// },
	// { song: "No One", audioFile: "no-one", year: 2007, xPercent: 0.5 }
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

const SOMEONE_LIKE_YOU_Y_PERCENT = 0.5;
const MORE_EXPANSIVE_VIEW = [
	{
		song: "Someone Like You",
		year: 2011,
		audioFile: "someone-like-you",
		rightAlign: true,
		noWrapTitle: true,
		yPercent: SOMEONE_LIKE_YOU_Y_PERCENT
	},
	{
		song: "Buy U A Drank (Shawty Snappin')",
		alternateTitle: "Buy U A Drank",
		year: 2007,
		// rightAlign: true,
		// placeAbove: true,
		audioFile: "buy-u-a-drank",
		yPercent: 0.1
	},
	{
		song: "WAP",
		year: 2020,
		rightAlign: true,
		audioFile: "wap",
		yPercent: 0.8
	}
];

const DEFINING_SERENADES = [
	{ song: "Fever", year: 1958, audioFile: "fever", yPercent: 0.9 },
	{
		song: "Like A Virgin",
		year: 1984,
		audioFile: "like-a-virgin",
		yPercent: 0.9
	},
	{
		song: "Just The Way You Are",
		year: 2010,
		// rightAlign: true,
		placeAbove: true,
		audioFile: "just-the-way-you-are",
		yPercent: 0.93
	}
];

const COLOR_IN_HEARTBREAK = [
	{
		song: "Smoke Gets In Your Eyes",
		year: 1958,
		audioFile: "smoke-gets-in-your-eyes",
		yPercent: 0.7
	},
	{
		song: "Someone Like You",
		year: 2011,
		audioFile: "someone-like-you",
		rightAlign: true,
		noWrapTitle: true,
		yPercent: SOMEONE_LIKE_YOU_Y_PERCENT
	},
	{
		song: "Stay",
		year: 2013,
		audioFile: "stay",
		rightAlign: true,
		yPercent: 0.15
	}
];

export const ANNOTATION_METADATA = {
	intro: {
		manuallySetPositions: [
			...SERENADE_HIGHLIGHTS_FROM_INTRO,
			...NON_SERENADE_HIGHLIGHTS_FROM_INTRO
		],
		annotations: {
			serenadeHighlights: SERENADE_HIGHLIGHTS_FROM_INTRO,
			nonSerenadeHighlights: NON_SERENADE_HIGHLIGHTS_FROM_INTRO
		}
	},
	timelineSpread: {
		manuallySetPositions: [...SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD],
		annotations: {
			serenadeHighlights: SERENADE_HIGHLIGHTS_FOR_TIMELINE_SPREAD
		}
	},
	serenadeComparisons: {
		manuallySetPositions: [
			...MORE_EXPANSIVE_VIEW,
			...DEFINING_SERENADES,
			...COLOR_IN_HEARTBREAK
		],
		annotations: {
			butWeWillTakeAMoreExpansiveView: MORE_EXPANSIVE_VIEW,
			definingSerenades: DEFINING_SERENADES,
			colorInHeartbreak: COLOR_IN_HEARTBREAK
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
const Y_MARGIN_TOP = 0.15;

const randomDistributionX = (canvasWidthOrHeight, position) =>
	canvasWidthOrHeight * (0 + MARGIN) +
	position * canvasWidthOrHeight * (1 - MARGIN * 2);

const randomDistributionY = (canvasWidthOrHeight, position) =>
	canvasWidthOrHeight * (0 + Y_MARGIN_TOP) +
	position * canvasWidthOrHeight * (1 - (Y_MARGIN_TOP + MARGIN));

export const randomXDistribution = (song, canvasWidthOrHeight, _, index) =>
	randomDistributionX(canvasWidthOrHeight, RANDOM_X_POSITIONS[index]);
export const randomYDistribution = (song, canvasWidthOrHeight, _, index) =>
	randomDistributionY(canvasWidthOrHeight, RANDOM_Y_POSITIONS[index]);
