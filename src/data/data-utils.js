import { SONG_DATA_COLUMNS_ENUM } from "./data-constants";
import { MAX_YEAR, MIN_YEAR } from "./songs-data";

const DOMAIN = MAX_YEAR - MIN_YEAR;
export const RIGHT_TOOLBAR_WIDTH = 280; // TODO: probably a better way to do this *shrug*

export const X_MARGIN = 80; // TODO: probably best off as a percentage of the canvas width

export const getXPosForYear = (year, canvasWidth) => {
	const xPercentage = (year - MIN_YEAR) / DOMAIN;
	return (
		X_MARGIN + xPercentage * (canvasWidth - RIGHT_TOOLBAR_WIDTH - 2 * X_MARGIN)
	);
};

export const PERFORMER_LIST_DELIMITER = "|";
export const getArrayOfPerformers = (song) => {
	const performers_list_str = song[SONG_DATA_COLUMNS_ENUM.performers_list_str];
	return performers_list_str
		? performers_list_str
				.split(PERFORMER_LIST_DELIMITER)
				.filter((p) => p !== "")
		: [];
};

export const onlyShowOneDecimalPlaceIfLessThan10 = (number) => {
	return number < 10 ? number.toFixed(1) : number.toFixed(0);
};
