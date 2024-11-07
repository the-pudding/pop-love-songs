import { derived } from "svelte/store";
import { currentStoryStep, isEndingSandboxStep } from "./storySteps";

let fetchedData = null;

export default derived(
	[isEndingSandboxStep, currentStoryStep],
	([$isEndingSandboxStep, $currentStoryStep], set) => {
		// We preload them on the step before
		if (
			($isEndingSandboxStep || $currentStoryStep.showFooter) &&
			!fetchedData
		) {
			const v = Date.now();
			const url = `https://pudding.cool/assets/data/stories.json?v=${v}`;
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					fetchedData = data;
					set(data);
				});
		}
	},
	[]
);
