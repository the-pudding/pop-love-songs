import { scaleLinear } from "d3";
import { SONG_DATA_COLUMNS_ENUM } from "./data-constants";
import { MAX_DATE, MIN_DATE } from "./songs-data";

export const Y_MARGIN_SCREEN_PERCENTAGE = 0.05;

export const X_MARGIN = 48; // This margin must accomodate the left/right nav arrows (Tap element)
const xScaleSansRange = scaleLinear().domain([MIN_DATE, MAX_DATE]);
export const xScaleJustAddRange = (canvasWidth) =>
	xScaleSansRange.range([X_MARGIN, canvasWidth - X_MARGIN]);

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

export const formatYearForDisplay = (year) => {
	return Math.floor(year);
	// const shortNumber = Math.floor(year % 100);
	// return `'${shortNumber > 9 ? shortNumber : "0" + shortNumber}`;
};

export const abbreviateYearForDisplay = (year) => {
	const shortNumber = Math.floor(year % 100);
	return `'${shortNumber > 9 ? shortNumber : "0" + shortNumber}s`;
};

export const formatSongTitleForDisplay = (title = "") =>
	title.split("(")[0].trim(); // songs get super long when they're like "San Francisco (Be Sure to Wear Flowers in Your Hair)"

export const songInAnnotations = (song, songAnnotations) => {
	const matchingAnnotation = songAnnotations.find(
		({ song: annotationSongName, year }) =>
			annotationSongName === song[SONG_DATA_COLUMNS_ENUM.song] &&
			year === Math.floor(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal])
	);
	return matchingAnnotation || false;
};
