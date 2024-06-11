import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { STORY_STEP_CONTROLLER_BOTTOM_PADDING } from "$components/viz/viz-utils";
import {
	getXPosForYear,
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
	const songYear = Math.round(+song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);
	const timeRegion = $loveSongsLabeledByTimeRegionPercentageForPosition.find(
		(timeRegion) => songYear >= timeRegion.start && songYear <= timeRegion.stop
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
