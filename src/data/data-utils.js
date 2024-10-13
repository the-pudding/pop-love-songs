import { SONG_DATA_COLUMNS_ENUM } from "./data-constants";

// TODO: replace this with a store (currently not being used in canvasPosition.js, which has its own copy)
export const Y_MARGIN_SCREEN_PERCENTAGE = 0.05;

export const PERFORMER_LIST_DELIMITER = "|";
export const getArrayOfPerformers = (song) => {
	const performers_list_str = song[SONG_DATA_COLUMNS_ENUM.performers_list_str];
	return performers_list_str
		? performers_list_str
				.split(PERFORMER_LIST_DELIMITER)
				.filter((p) => p !== "")
		: [];
};

export const formatPerformersForDisplay = (performers) =>
	performers
		.map(
			(performer, index) =>
				`${performer}${index < performers.length - 1 ? ", " : ""}`
		)
		.join("");

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
	return `'${shortNumber > 9 ? shortNumber : "0" + shortNumber}`;
};

export const formatSongTitleForDisplay = (title = "") =>
	title.split("(")[0].trim().split("/")[0].trim(); // songs get super long when they're like "San Francisco (Be Sure to Wear Flowers in Your Hair)"

export const songInAnnotations = (song, songAnnotations) => {
	const { offsetAnnotations = [], adjacentAnnotations = [] } =
		songAnnotations || {};

	const matchingOffsetAnnotation = offsetAnnotations.find(
		({ song: annotationSongName, year }) =>
			annotationSongName === song[SONG_DATA_COLUMNS_ENUM.song] &&
			year === Math.floor(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal])
	);
	const matchingAdjacentAnnotation = adjacentAnnotations.find(
		({ song: annotationSongName, year }) =>
			annotationSongName === song[SONG_DATA_COLUMNS_ENUM.song] &&
			year === Math.floor(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal])
	);

	if (matchingOffsetAnnotation) {
		return {
			...matchingOffsetAnnotation,
			offsetAnnotation: true
		};
	}
	if (matchingAdjacentAnnotation) {
		return {
			...matchingAdjacentAnnotation,
			adjacentAnnotation: true
		};
	}

	return false;
};

// Cuz manuallySetPositions is actually just combined inner data from multiple song annotations
export const songInManuallySetPositions = (song, manuallySetPositions) =>
	manuallySetPositions.find(
		({ song: annotationSongName, year }) =>
			annotationSongName === song[SONG_DATA_COLUMNS_ENUM.song] &&
			year === Math.floor(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal])
	);
