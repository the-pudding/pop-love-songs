<script>
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import viewport from "$stores/viewport";
	import { visibleButNotSelectedLoveSongTypes } from "$stores/searchAndFilter";
	import { getXPosForYear } from "$data/data-utils";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";

    export let tweenedCoords;

    // TODO: maybe make this a pre-derived store?
    $: getLabelCoords = (svgCoords) => {
		const {x, y0, y1} = svgCoords[0]
		return {
			x: getXPosForYear(x, $viewport.width),
			// TODO: @michelle there's gotta be a better way to align text to the baseline via css...
			y: getYPosForPercentage(y0, $viewport.height) - 0.035 * $viewport.height
		}
	};

</script>
{#each tweenedCoords as { loveSongType, svgCoords }}
		<div class="snake-label" style:left={`${getLabelCoords(svgCoords).x}px`} style:top={`${getLabelCoords(svgCoords).y}px`} fill="black" opacity={
			$visibleButNotSelectedLoveSongTypes.includes(loveSongType)
				? 0 
				: 1
		}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}</div>
{/each}

<style>
    div.snake-label {
		font-size: clamp(1rem, 2vw, 1.25rem);
		position: fixed;
	}
</style>