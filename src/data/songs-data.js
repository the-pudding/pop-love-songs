import rawSongsData from "$data/20-EXPORT-viz-ready-data.json";

// Wrap each array in an object (so force simulation can mutate it)
const wrappedData = rawSongsData.map((song) => ({
	song,
	radius: song.popularity_score
}));

// Export
export default wrappedData;
