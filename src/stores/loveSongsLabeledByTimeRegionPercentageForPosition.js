import { derived } from "svelte/store";
import {
	LOVE_SONG_TYPE_CONSTANTS,
	SONG_DATA_COLUMNS_ENUM
} from "$data/data-constants.js";
import { visibleSongsData } from "./dataDerivations";
import songsData, { MAX_DATE, MIN_DATE } from "$data/songs-data";
import { typesTreatedAsNonLoveSongs } from "./searchAndFilter";

// algo:
// 1. given an array of non-overlapping, contiguous time regions (an array with a start & stop year)...
// Use 1968-1969, then do decades from there on out (1970-1979, 1980-1989, etc.)
export const aggregationTimeRegions = [
	{
		start: MIN_DATE,
		stop: 1969
	},
	{
		start: 1970,
		stop: 1979
	},
	{
		start: 1980,
		stop: 1989
	},
	{
		start: 1990,
		stop: 1999
	},
	{
		start: 2000,
		stop: 2009
	},
	{
		start: 2010,
		stop: 2019
	},
	{
		start: 2020,
		stop: MAX_DATE
	}
];

// 2. ... aggregate the total songs for each time region, then label each with a sumative percentage, append that to the object
export const getPopularitySumByType = (
	songsInTimeRegion,
	typesTreatedAsNonLoveSongs
) =>
	songsInTimeRegion.reduce((acc, { song }) => {
		const loveSongType = typesTreatedAsNonLoveSongs.includes(
			song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
		)
			? LOVE_SONG_TYPE_CONSTANTS.notALoveSong
			: song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
		const popularity = song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10];
		return {
			...acc,
			[loveSongType]: (acc[loveSongType] || 0) + popularity
		};
	}, {});

export const getOffsetAndSqueeze = (
	popularitySumIgnoringFilters,
	popularityScoreSumsInTimeRegion
) => {
	const squeezePercentageMultiplier =
		popularityScoreSumsInTimeRegion / popularitySumIgnoringFilters;
	const percentToOffset = (1 - squeezePercentageMultiplier) / 2;

	return { percentToOffset, squeezePercentageMultiplier };
};

export const getPercentage = (
	squeezePercentageMultiplier,
	loveSongTypePopularity,
	popularityScoreSumsInTimeRegion
) => {
	return (
		squeezePercentageMultiplier *
		(loveSongTypePopularity / popularityScoreSumsInTimeRegion)
	);
};

export const sortLoveSongTypesTopToBottom = (popularitySumByType) => {
	let sorted = Object.keys(popularitySumByType).sort(
		(a, b) => popularitySumByType[b] - popularitySumByType[a]
	);
	// Special case: the "greatest" (ie first) love song type should always be "not a love song"
	const notALoveSongIndex = sorted.indexOf(
		`${LOVE_SONG_TYPE_CONSTANTS.notALoveSong}`
	);
	const firstElementIsNonLoveSongType = notALoveSongIndex === 0;
	const nonLoveSongsArePresent = notALoveSongIndex !== -1;
	if (!firstElementIsNonLoveSongType && nonLoveSongsArePresent) {
		sorted.splice(notALoveSongIndex, 1);
		sorted.unshift(`${LOVE_SONG_TYPE_CONSTANTS.notALoveSong}`);
	}

	return sorted;
};

const getAggregatePercentageByLoveSongType = (
	songsInTimeRegion,
	typesTreatedAsNonLoveSongs,
	popularitySumIgnoringFilters
) => {
	const popularitySumByType = getPopularitySumByType(
		songsInTimeRegion,
		typesTreatedAsNonLoveSongs
	);

	const loveSongTypesSortedGreatestToLeast =
		sortLoveSongTypesTopToBottom(popularitySumByType);

	// Note, the percentages are summative, meaning that if the largest (first) value is "Serenade" at 50%, then the next value will be "Serenade" + "Heartache" at 75%.
	const popularityScoreSumsInTimeRegion = Object.keys(
		popularitySumByType
	).reduce((acc, loveSongType) => acc + popularitySumByType[loveSongType], 0);

	// Given that we may be working with 100% of love songs in this region, we will offset & squeeze the chart down to size (centered)
	const { percentToOffset, squeezePercentageMultiplier } = getOffsetAndSqueeze(
		popularitySumIgnoringFilters,
		popularityScoreSumsInTimeRegion
	);

	const nonZeroResult = loveSongTypesSortedGreatestToLeast.reduce(
		(acc, loveSongType) => {
			const totalPercentageThatHasBeenAccountedFor = Object.keys(acc).reduce(
				(sum, accountedForLoveSongType) =>
					sum +
					getPercentage(
						squeezePercentageMultiplier,
						popularitySumByType[accountedForLoveSongType],
						popularityScoreSumsInTimeRegion
					),
				percentToOffset
			);
			const loveSongPercentage = getPercentage(
				squeezePercentageMultiplier,
				popularitySumByType[loveSongType],
				popularityScoreSumsInTimeRegion
			);

			return {
				...acc,
				// Note: want to place the dots in the middle of the band, so divide by 2
				[loveSongType]: {
					y0: totalPercentageThatHasBeenAccountedFor + loveSongPercentage,
					y1: totalPercentageThatHasBeenAccountedFor
				}
			};
		},
		{}
	);

	// SPECIAL CASE: if we treated some love songs as non-love songs, they didn't show up in the count, so we add them explicitely
	const loveSongsCountedAsNonLoveSongs = typesTreatedAsNonLoveSongs.reduce(
		(acc, loveSongType) => {
			return {
				...acc,
				// Position these secret love songs same as non-love songs
				[loveSongType]: nonZeroResult[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]
			};
		},
		{}
	);

	return {
		...nonZeroResult,
		...loveSongsCountedAsNonLoveSongs
	};
};
const POPULARITY_SUM_BY_TIME_REGION_IGNORING_FILTERS =
	aggregationTimeRegions.reduce((acc, timeRegion) => {
		const sum = songsData.reduce((regionAcc, { song }) => {
			const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
			return songYear >= timeRegion.start && songYear <= timeRegion.stop
				? regionAcc + song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]
				: regionAcc;
		}, 0);
		return {
			...acc,
			[`${timeRegion.start}-${timeRegion.stop}`]: sum
		};
	}, {});

export const getPopularitySumIgnoringFilters = (timeRegion) =>
	POPULARITY_SUM_BY_TIME_REGION_IGNORING_FILTERS[
		`${timeRegion.start}-${timeRegion.stop}`
	];

export const loveSongsLabeledByTimeRegionPercentageForPosition = derived(
	[visibleSongsData, typesTreatedAsNonLoveSongs],
	([$visibleSongsData, $typesTreatedAsNonLoveSongs]) => {
		return aggregationTimeRegions.map((timeRegion) => {
			const popularitySumIgnoringFilters =
				getPopularitySumIgnoringFilters(timeRegion);
			const songsInTimeRegion = $visibleSongsData.filter(({ song }) => {
				const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
				return songYear >= timeRegion.start && songYear <= timeRegion.stop;
			});

			return {
				...timeRegion,
				popularityScoreSumsInTimeRegion: getAggregatePercentageByLoveSongType(
					songsInTimeRegion,
					$typesTreatedAsNonLoveSongs,
					popularitySumIgnoringFilters
				)
			};
		});
	}
);
