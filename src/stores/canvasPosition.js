import { derived } from "svelte/store";

import { currentStoryStep } from "./storySteps";
import viewport from "./viewport";

export const calculateXForcePosition = derived(
	[viewport, currentStoryStep],
	([$viewport, $currentStoryStep]) => {
		const { width } = $viewport;
		const { calculateXForcePosition } = $currentStoryStep.visualEncodings;
		return ({ song }, index) =>
			calculateXForcePosition(song, width, undefined, index);
	}
);
