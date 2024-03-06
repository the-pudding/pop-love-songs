import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data";

export const DEFAULT_Y_ENTRANCE_POSITION = -100;

/*
 * All functions take in song and a canvas width and returns a position
 */

// --- xForcePosition options ---

const DOMAIN = MAX_YEAR - MIN_YEAR;
export const RIGHT_TOOLBAR_WIDTH = 280; // TODO: probably a better way to do this *shrug*

const X_MARGIN = 80;
export const getXPositionFromTime = (song, canvasWidth) => {
	const xPercentage =
		(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal] - MIN_YEAR) / DOMAIN;
	return (
		X_MARGIN + xPercentage * (canvasWidth - RIGHT_TOOLBAR_WIDTH - 2 * X_MARGIN)
	);
};

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

const Y_MARGIN = 24;
export const STORY_STEP_CONTROLLER_BOTTOM_PADDING = 100;

export const getYPositionInSnakeChart = (
	song,
	canvasHeight,
	$loveSongsLabeledByTimeRegionPercentageForPosition
) =>
	Y_MARGIN +
	getPercentageForSong(
		song,
		$loveSongsLabeledByTimeRegionPercentageForPosition
	) *
		(canvasHeight - (2 * Y_MARGIN + STORY_STEP_CONTROLLER_BOTTOM_PADDING));

// x and y

export const fractionOfScreenFactory =
	(fraction = 0.5, randomVariance = 0.05) =>
	(song, canvasWidthOrHeight) => {
		const range = canvasWidthOrHeight - 2 * X_MARGIN;
		const randomOffset = range * randomVariance * (Math.random() - 1);
		return randomOffset + X_MARGIN + fraction * range;
	};
