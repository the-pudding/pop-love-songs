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

// 2. ... aggregate the total songs for each time region, append that to the object with total counts ie { ..., rankedCategories: { "Serenade": 200, etc}}
const aggregateByLoveSongType = (loveSongs) =>
	loveSongs.reduce((acc, song) => {
		const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
		acc[loveSongType] = acc[loveSongType] + 1 || 1;
		return acc;
	}, {});

const rankedCategories = aggregationTimeRegions.map((timeRegion) => {
	const songsInTimeRegion = rawSongsData.filter((song) => {
		const songYear = +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
		return songYear >= timeRegion.start && songYear <= timeRegion.stop;
	});

	return {
		...timeRegion,
		totalSongsInTimeRegion: aggregateByLoveSongType(songsInTimeRegion)
	};
});

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
