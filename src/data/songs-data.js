import rawSongsData from "$data/pop-love-songs-data-through-september-2023.json";

// NOTE: update these if you ever expand the data range
export const MIN_DATE = 1958.59;
// 	rawSongsData.reduce(
// 	(acc, song) => Math.min(acc, +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]),
// 	Infinity
// );
export const MAX_DATE = 2023.75;
// 	rawSongsData.reduce(
// 	(acc, song) => Math.max(acc, +song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]),
// 	-Infinity
// );

// Wrap each array in an object (to which force simulation will attach properties)
const wrappedData = rawSongsData.map((song, songIndex) => ({
	song,
	songIndex // for fast lookup, since data derivations are kept in the order of the data
}));

export default wrappedData;
