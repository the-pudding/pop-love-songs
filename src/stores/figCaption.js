import { derived } from "svelte/store";
import { currentStoryStep } from "./storySteps";

export const figCaption = derived(currentStoryStep, ($currentStoryStep) => {
	return $currentStoryStep.figCaption;
});
