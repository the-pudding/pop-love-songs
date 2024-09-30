import { derived } from "svelte/store";

import { currentStoryStep } from "./storySteps";
import viewport from "./viewport";
import { getXPositionFromTime } from "./forcePositionOptions-helper";

import { xScaleJustAddRange } from "$data/data-utils";
import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

export const getXPositionForYear = derived([viewport], ([$viewport]) => {
	return (year) => xScaleJustAddRange($viewport.width)(year);
});

export const calculateXForcePosition = derived(
	[viewport, currentStoryStep, getXPositionForYear],
	([$viewport, $currentStoryStep, $getXPositionForYear]) => {
		const { width } = $viewport;
		const { calculateXForcePosition } = $currentStoryStep.visualEncodings;
		// In this case, we need a store, which we aren't able to provide in the storySteps file, so we just inject it here
		if (calculateXForcePosition === getXPositionFromTime) {
			return ({ song }) =>
				$getXPositionForYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);
		}
		return ({ song }, index) =>
			calculateXForcePosition(song, width, undefined, index);
	}
);
