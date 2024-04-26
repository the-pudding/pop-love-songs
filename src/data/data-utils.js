import { scaleLinear } from "d3";
import { SONG_DATA_COLUMNS_ENUM } from "./data-constants";
import { MAX_YEAR, MIN_YEAR } from "./songs-data";

export const Y_MARGIN = 56;

export const RIGHT_TOOLBAR_WIDTH = 280; // TODO: probably a better way to do this *shrug*

export const X_MARGIN = 24; // TODO: probably best off as a percentage of the canvas width
const xScaleSansRange = scaleLinear().domain([MIN_YEAR, MAX_YEAR]);
// TODO: @michelle is it inefficient to create a new scale every time we call this function?
export const xScaleJustAddRange = (canvasWidth) =>
	xScaleSansRange.range([
		X_MARGIN,
		canvasWidth - RIGHT_TOOLBAR_WIDTH - X_MARGIN
	]);

export const getXPosForYear = (year, canvasWidth) => {
	// set the domain with canvas width
	return xScaleJustAddRange(canvasWidth)(year);
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
