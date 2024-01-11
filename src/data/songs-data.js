import rawSongsData from "$data/20-EXPORT-viz-ready-data.json";
import { SONG_DATA_COLUMNS_ENUM } from "./data-constants";
import { calculateRadiusFromPopularityScore } from "$components/viz/viz-utils.js";

// Wrap each array in an object (so force simulation can attach properties)
const wrappedData = rawSongsData.map((song) => ({
	song,
	radius: calculateRadiusFromPopularityScore(
		+song[SONG_DATA_COLUMNS_ENUM.popularity_score]
	)
}));

export default wrappedData;
