import { derived } from "svelte/store";

import viewport from "./viewport";
import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
import { MAX_DATE, MIN_DATE } from "$data/songs-data";
import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
import { typesTreatedAsNonLoveSongs } from "./searchAndFilter";
import { getXPositionForYear } from "./canvasPosition";

const MID_DATE = MIN_DATE + (MAX_DATE - MIN_DATE) / 2;
const Y_PADDING = 0.04;
export const nonLoveSongLabelBottomLeftCoords = derived(
	[getXPositionForYear, viewport],
	([$getXPositionForYear, $viewport]) => ({
		x: $getXPositionForYear(MID_DATE),
		y: getYPosForPercentage(0 + Y_PADDING, $viewport.height)
	})
);

export const loveSongTypeToDisplayTextMap = derived(
	[typesTreatedAsNonLoveSongs],
	([$typesTreatedAsNonLoveSongs]) =>
		Object.keys(LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP).reduce(
			(loveSongTypeToDisplayTextMap, loveSongType) => ({
				...loveSongTypeToDisplayTextMap,
				[loveSongType]: $typesTreatedAsNonLoveSongs.includes(+loveSongType)
					? LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP.notALoveSong
					: LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]
			}),
			{}
		)
);
