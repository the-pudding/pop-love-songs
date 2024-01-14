import rawSongsData from "$data/20-EXPORT-viz-ready-data.json";
import { SONG_DATA_COLUMNS_ENUM } from "./data-constants";
import { calculateRadiusFromPopularityScore } from "$components/viz/viz-utils.js";

// algo:
// 1. given an array of non-overlapping, contiguous time regions (an array with a start & stop year)...
// Use 1968-1969, then do decades from there on out (1970-1979, 1980-1989, etc.)
let aggregationTimeRegions = [
	{
		start: 1958,
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
		stop: 2029
	}
];

// 2. ... aggregate the total songs for each time region, then label each with a sumative percentage, append that to the object

const getAggregatePercentageByLoveSongType = (songsInTimeRegion) => {
	// 1. aggregate
	const aggregateCount = songsInTimeRegion.reduce((acc, song) => {
		const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
		return {
			...acc,
			[loveSongType]: acc[loveSongType] + 1 || 1
		};
	}, {});

	const loveSongTypesSortedGreatestToLeast = Object.keys(aggregateCount).sort(
		(a, b) => aggregateCount[b] - aggregateCount[a]
	);

	// // 2. Sort in descending order (biggest to smallest), then convert to percentages.
	// // Note, the percentages are summative, meaning that if the largest (first) value is "Serenade" at 50%, then the next value will be "Serenade" + "Longing & Heartbreak" at 75%.
	const totalSongsInTimeRegion = Object.keys(aggregateCount).reduce(
		(acc, loveSongType) => acc + aggregateCount[loveSongType],
		0
	);

	return loveSongTypesSortedGreatestToLeast.reduce((acc, loveSongType) => {
		const totalPercentageThatHasBeenAccountedFor = Object.keys(acc).reduce(
			(sum, accountedForLoveSongType) =>
				sum + aggregateCount[accountedForLoveSongType] / totalSongsInTimeRegion,
			0
		);
		const loveSongPercentage =
			aggregateCount[loveSongType] / totalSongsInTimeRegion;

		return {
			...acc,
			// Note: want to place the dots in the middle of the band, so divide by 2
			[loveSongType]:
				totalPercentageThatHasBeenAccountedFor + loveSongPercentage / 2
		};
	}, {});
};

const loveSongsLabeledByTimeRegionPercentageForPosition =
	aggregationTimeRegions.map((timeRegion) => {
		const songsInTimeRegion = rawSongsData.filter((song) => {
			const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
			return songYear >= timeRegion.start && songYear <= timeRegion.stop;
		});

		return {
			...timeRegion,
			totalSongsInTimeRegion:
				getAggregatePercentageByLoveSongType(songsInTimeRegion)
		};
	});
console.log(loveSongsLabeledByTimeRegionPercentageForPosition);
// 3. Translate the sorted stack into a function that can return WHERE on the y-axis the "gravity x-axis" should sit for each category
// 4. (feed that function to the y-force method)

// Wrap each array in an object (so force simulation can attach properties)
const wrappedData = rawSongsData.map((song) => ({
	song,
	radius: calculateRadiusFromPopularityScore(
		+song[SONG_DATA_COLUMNS_ENUM.popularity_score]
	)
}));

export default wrappedData;
