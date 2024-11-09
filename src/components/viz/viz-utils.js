export const BUBBLE_BORDER_THICKNESS = 4;

const NEXT_COLOR_STEP = 1; // keep this as 1
const BASE_OFFSET = 10;

export const getInvisibleFillFromSongIndex = (songIndex) => {
	const uniqueColorOffset = BASE_OFFSET + songIndex * NEXT_COLOR_STEP;
	const MAX_COLOR = 16777215; // 256^3 - 1, as RGB color max value is 255 for each channel
	if (uniqueColorOffset > MAX_COLOR) {
		console.error(
			`Too many songs to assign unique colors with a step size ${NEXT_COLOR_STEP}`
		);
	}

	const rgb = [];
	rgb.push(uniqueColorOffset & 0xff); // R.
	rgb.push((uniqueColorOffset >> 8) & 0xff); // G.
	rgb.push((uniqueColorOffset >> 16) & 0xff); // B.
	return `rgb(${rgb.join(",")})`;
};

const lookForSongIndexFromInvisibleFill = (
	invisibleContext,
	offsetX,
	offsetY
) => {
	const { data } = invisibleContext.getImageData(offsetX, offsetY, 1, 1);
	const r = data[0];
	const g = data[1] << 8; // shift to correct position
	const b = data[2] << 16; // shift to correct position
	// If all the values are zero, it's the background, so return null
	if (r === 0 && g === 0 && b === 0) {
		return null;
	}
	// Reconstruct the rgb hex value
	const rgbHex = r | g | b;
	// Convert to a song index
	const songIndex = (rgbHex - BASE_OFFSET) / NEXT_COLOR_STEP;
	return songIndex < 0 ? null : songIndex;
};

export const getSongIndexFromClickLocation = (
	invisibleContext,
	offsetX,
	offsetY
) => {
	const DISTANCE_TO_EXPLORE = 1; // I tried a lot of smaller values, this seems to work best, though it it does exclude super tiny songs
	const offsetsToTry = [
		[offsetX, offsetY],
		[offsetX + DISTANCE_TO_EXPLORE, offsetY + DISTANCE_TO_EXPLORE],
		[offsetX - DISTANCE_TO_EXPLORE, offsetY - DISTANCE_TO_EXPLORE],
		[offsetX + DISTANCE_TO_EXPLORE, offsetY - DISTANCE_TO_EXPLORE],
		[offsetX - DISTANCE_TO_EXPLORE, offsetY + DISTANCE_TO_EXPLORE]
	];
	const potentialSongIndexes = offsetsToTry.map(([x, y]) =>
		lookForSongIndexFromInvisibleFill(invisibleContext, x, y)
	);
	const MIN_NUM_MATCHING_SONG_INDEXES = 3;
	// Check if the count of the most common song index is greater than the minimum
	const songIndex = potentialSongIndexes.reduce((acc, curr) => {
		acc[curr] = (acc[curr] || 0) + 1;
		return acc;
	}, {});
	const songIndexCounts = Object.values(songIndex);
	const maxSongIndexCount = Math.max(...songIndexCounts);

	if (maxSongIndexCount < MIN_NUM_MATCHING_SONG_INDEXES) {
		return null;
	}

	// Get the song index that has the highest count
	const songIndexWithMaxCount = Object.keys(songIndex).find(
		(key) => songIndex[key] === maxSongIndexCount
	);
	return songIndexWithMaxCount;
};

export const getSnakeFill = (
	loveSongType,
	visibleButNotSelected,
	$loveSongTypeColorMap,
	$unselectedLoveSongTypeColorMap
) =>
	visibleButNotSelected
		? $unselectedLoveSongTypeColorMap[loveSongType]
		: $loveSongTypeColorMap[loveSongType];
