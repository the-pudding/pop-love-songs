<script>
	import { derived } from "svelte/store";
	
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import viewport from "$stores/viewport";
	import { visibleButNotSelectedLoveSongTypes } from "$stores/searchAndFilter";
	import { getXPosForYear } from "$data/data-utils";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	

    export let tweenedCoords;

	// @michelle: is this an anti-pattern? ie mixing store derivation with reactive statements
	$: labelMetadata = derived(
		[visibleButNotSelectedLoveSongTypes, viewport],
		([$visibleButNotSelectedLoveSongTypes, $viewport]) => {
			return tweenedCoords.map(({ loveSongType, svgCoords }) => ({
				loveSongType,
				x: getXPosForYear(svgCoords[0].x, $viewport.width),
				// TODO: @michelle there's gotta be a better way to align text to the baseline via css...
				// TODO: Also, I think I need to factor in the conditional margin between snakes...
				y: getYPosForPercentage(svgCoords[0].y0, $viewport.height) - 0.035 * $viewport.height,
				opacity: $visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 0 : 1
			}))
		}
	);

</script>
{#each $labelMetadata as { loveSongType, x, y, opacity }}
	<div class="snake-label" style:left={`${x}px`} style:top={`${y}px`} fill="black" opacity={opacity}>
		{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
	</div>
{/each}

<style>
    div.snake-label {
		font-size: clamp(1rem, 2vw, 1.25rem);
		position: fixed;
	}
</style>