// TODO: move the existing x & y functinos, as well as the snake chart calculation (which maybe is a store? maybe ignore for now to get something working)
import {SONG_DATA_COLUMNS_ENUM} from "$data/data-constants.js";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data";

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