import { derived } from "svelte/store";
import { currentStoryStep, isEndingSandboxStep } from "./storySteps";
import {
	modernYScreenPercentage,
	sixtiesYScreenPercentage
} from "./aggregateSnakeChartPositions";
import { displayLoveSongPercentage } from "$data/data-utils";

const SIXTIES_PERCENT_PLACEHOLDER = "SIXTIES_PERCENT";
const MODERN_PERCENT_PLACEHOLDER = "MODERN_PERCENT";
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
			return $currentStoryStep.figCaption
				.replace(
					SIXTIES_PERCENT_PLACEHOLDER,
					displayLoveSongPercentage($sixtiesYScreenPercentage)
				)
				.replace(
					MODERN_PERCENT_PLACEHOLDER,
					displayLoveSongPercentage($modernYScreenPercentage)
				);
		}
		return $currentStoryStep.figCaption;
	}
);