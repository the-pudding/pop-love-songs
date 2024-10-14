import { derived } from "svelte/store";
import { currentStoryStep, isEndingSandboxStep } from "./storySteps";
import {
	modernYScreenPercentage,
	sixtiesYScreenPercentage
} from "./aggregateSnakeChartPositions";
import { displayLoveSongPercentage } from "$data/data-utils";

export const figCaption = derived(
	[
		currentStoryStep,
		isEndingSandboxStep,
		sixtiesYScreenPercentage,
		modernYScreenPercentage
	],
	([
		$currentStoryStep,
		$isEndingSandboxStep,
		$sixtiesYScreenPercentage,
		$modernYScreenPercentage
	]) => {
		if ($isEndingSandboxStep) {
			const INTRO = `Chart comparing the change of love song types over time, allowing you to interactively add or remove different types of love songs.`;
			return `${INTRO} The love song percentage changes from ${displayLoveSongPercentage($sixtiesYScreenPercentage)}% in the 1960s to ${displayLoveSongPercentage($modernYScreenPercentage)}% in the modern era.`;
		}
		return $currentStoryStep.figCaption;
	}
);
