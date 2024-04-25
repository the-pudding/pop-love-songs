import { derived } from "svelte/store";
import {
	LOVE_SONG_TYPE_CONSTANTS,
	SONG_DATA_COLUMNS_ENUM
} from "$data/data-constants.js";
import { visibleSongsData } from "./dataDerivations";
import { MAX_YEAR, MIN_YEAR } from "$data/songs-data";
import { typesTreatedAsNonLoveSongs } from "./storySteps";

// algo:
// 1. given an array of non-overlapping, contiguous time regions (an array with a start & stop year)...
// Use 1968-1969, then do decades from there on out (1970-1979, 1980-1989, etc.)
export const aggregationTimeRegions = [
	{
		start: MIN_YEAR,
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
		stop: MAX_YEAR
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
		const popularity = song[SONG_DATA_COLUMNS_ENUM.popularity_score];
		return {
			...acc,
			[loveSongType]: (acc[loveSongType] || 0) + popularity
		};
	}, {});

const getAggregatePercentageByLoveSongType = (
	songsInTimeRegion,
	typesTreatedAsNonLoveSongs
) => {
	// 1. aggregate
	const popularitySumByType = getPopularitySumByType(
		songsInTimeRegion,
		typesTreatedAsNonLoveSongs
	);

	const loveSongTypesSortedGreatestToLeast = Object.keys(
		popularitySumByType
	).sort((a, b) => popularitySumByType[b] - popularitySumByType[a]);

	// // 2. Sort in descending order (biggest to smallest), then convert to percentages.
	// // Note, the percentages are summative, meaning that if the largest (first) value is "Serenade" at 50%, then the next value will be "Serenade" + "Longing & Heartbreak" at 75%.
	const popularityScoreSumsInTimeRegion = Object.keys(
		popularitySumByType
	).reduce((acc, loveSongType) => acc + popularitySumByType[loveSongType], 0);

	const nonZeroResult = loveSongTypesSortedGreatestToLeast.reduce(
		(acc, loveSongType) => {
			const totalPercentageThatHasBeenAccountedFor = Object.keys(acc).reduce(
				(sum, accountedForLoveSongType) =>
					sum +
					popularitySumByType[accountedForLoveSongType] /
						popularityScoreSumsInTimeRegion,
				0
			);
			const loveSongPercentage =
				popularitySumByType[loveSongType] / popularityScoreSumsInTimeRegion;

			return {
				...acc,
				// Note: want to place the dots in the middle of the band, so divide by 2
				[loveSongType]:
					totalPercentageThatHasBeenAccountedFor + loveSongPercentage / 2
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

export const loveSongsLabeledByTimeRegionPercentageForPosition = derived(
	[visibleSongsData, typesTreatedAsNonLoveSongs],
	([$visibleSongsData, $typesTreatedAsNonLoveSongs]) => {
		return aggregationTimeRegions.map((timeRegion) => {
			const songsInTimeRegion = $visibleSongsData.filter(({ song }) => {
				const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
				return songYear >= timeRegion.start && songYear <= timeRegion.stop;
			});

			return {
				...timeRegion,
				popularityScoreSumsInTimeRegion: getAggregatePercentageByLoveSongType(
					songsInTimeRegion,
					$typesTreatedAsNonLoveSongs
				)
			};
		});
	}
);
