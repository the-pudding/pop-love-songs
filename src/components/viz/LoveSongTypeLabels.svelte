<script>
	import { derived } from "svelte/store";

	import viewport from "$stores/viewport";
	import { visibleButNotSelectedLoveSongTypes } from "$stores/searchAndFilter";
	import { getXPosForYear } from "$data/data-utils";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	import LoveSongTypeCategoryButtons from "./LoveSongTypeCategoryButtons.svelte";
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { currentStoryStep } from "$stores/storySteps";
	

    export let tweenedCoords;

	// @michelle: is this an anti-pattern? ie mixing store derivation with reactive statements
	$: labelMetadata = derived(
		[visibleButNotSelectedLoveSongTypes, viewport],
		([$visibleButNotSelectedLoveSongTypes, $viewport]) => {
			return tweenedCoords.reduce((acc, { loveSongType, svgCoords }) => {
				const MIN_Y_HEIGHT_TO_FIT_LABEL = 0.04;
				const {x, y0, y1} = svgCoords.find(({y0, y1}) => (y0 - y1) >= MIN_Y_HEIGHT_TO_FIT_LABEL) || {};
				if (x === undefined || y0 === undefined) return acc;

				return [... acc, {
					loveSongType,
					x: getXPosForYear(x, $viewport.width),
					// TODO: @michelle there's gotta be a better way to align text to the baseline via css...
					// TODO: Also, I think I need to factor in the conditional margin between snakes...
					y: getYPosForPercentage(y0, $viewport.height) - 0.035 * $viewport.height,
					opacity: $visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 0 : 1,
					// TODO: for some reason, I can't seem to set the style:fontSize property on the dev... ?
					fontSize: (y0 - y1) < 2 * MIN_Y_HEIGHT_TO_FIT_LABEL ? "clamp(0.5rem, 2vw, .75rem)" : "clamp(1rem, 2vw, 1.25rem)"
				}]
			}, []);
		}
	);
</script>

{#each $labelMetadata as { loveSongType, x, y, opacity, fontSize }}
	<div class={$currentStoryStep.allowUserToChangeFilters ? '' : 'no-pointer-events' } style:left={`${x}px`} style:top={`${y}px`} fill="black" style:opacity={opacity} style:fontSize={fontSize}>
		{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
		<LoveSongTypeCategoryButtons loveSongType={loveSongType} />
	</div>
{/each}

<style>
    div {
		/* TODO: For some reason I can only set font-size via css... */
		font-size: clamp(1rem, 2vw, 1.25rem);
		position: fixed;
	}

	div.no-pointer-events {
		pointer-events: none;
	}
</style>