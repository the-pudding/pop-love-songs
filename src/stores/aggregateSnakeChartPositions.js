import { derived } from "svelte/store";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
import { visibleSongsData } from "./dataDerivations";

// algo:
// 1. given an array of non-overlapping, contiguous time regions (an array with a start & stop year)...
// Use 1968-1969, then do decades from there on out (1970-1979, 1980-1989, etc.)
import { aggregationTimeRegions } from "./loveSongsLabeledByTimeRegionPercentageForPosition";

// 2. ... aggregate the total songs for each time region, then label each with a sumative percentage, append that to the object

const getAggregatePercentageByLoveSongType = (songsInTimeRegion) => {
	// 1. aggregate
	const popularitySumByType = songsInTimeRegion.reduce((acc, { song }) => {
		const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
		const popularity = song[SONG_DATA_COLUMNS_ENUM.popularity_score];
		return {
			...acc,
			[loveSongType]: (acc[loveSongType] || 0) + popularity
		};
	}, {});

	const loveSongTypesSortedGreatestToLeast = Object.keys(
		popularitySumByType
	).sort((a, b) => popularitySumByType[b] - popularitySumByType[a]);

	// // 2. Sort in descending order (biggest to smallest), then convert to percentages.
	// // Note, the percentages are summative, meaning that if the largest (first) value is "Serenade" at 50%, then the next value will be "Serenade" + "Longing & Heartbreak" at 75%.
	const popularityScoreSumsInTimeRegion = Object.keys(
		popularitySumByType
	).reduce((acc, loveSongType) => acc + popularitySumByType[loveSongType], 0);

	return loveSongTypesSortedGreatestToLeast.reduce((acc, loveSongType) => {
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
	}, {});
};

export const aggregateSnakeChartPositions = derived(
	[visibleSongsData],
	([$visibleSongsData]) => {
		return aggregationTimeRegions.map((timeRegion) => {
			const songsInTimeRegion = $visibleSongsData.filter(({ song }) => {
				const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
				return songYear >= timeRegion.start && songYear <= timeRegion.stop;
			});

			return {
				...timeRegion,
				popularityScoreSumsInTimeRegion:
					getAggregatePercentageByLoveSongType(songsInTimeRegion)
			};
		});
	}
);
