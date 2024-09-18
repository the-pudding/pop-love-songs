import { derived } from "svelte/store";
import viewport from "$stores/viewport";

import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
import { getXPosForYear } from "$data/data-utils";
import { MAX_DATE, MIN_DATE } from "$data/songs-data";

const MID_DATE = MIN_DATE + (MAX_DATE - MIN_DATE) / 2;
const Y_PADDING = 0.04;
export const nonLoveSongLabelBottomLeftCoords = derived(
	[viewport],
	([$viewport]) => ({
		x: getXPosForYear(MID_DATE, $viewport.width),
		y: getYPosForPercentage(0 + Y_PADDING, $viewport.height)
	})
);
