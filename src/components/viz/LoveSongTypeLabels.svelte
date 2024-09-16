<script>
	import viewport from "$stores/viewport";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	import { aSingleLoveSongTypeIsSpotlighted, currentStoryStep } from "$stores/storySteps";

	import { getXPosForYear } from "$data/data-utils";
	import { LOVE_SONG_TYPE_CONSTANTS, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";

	import NonLoveSongLabel from "./NonLoveSongLabel.svelte";
	import LoveSongTypeCategoryButtons from "./LoveSongTypeCategoryButtons.svelte";

    export let tweenedCoords;

	const getX = (x, width) => {
		return getXPosForYear(x, width);
	}
	const getY = (y0, y1, loveSongType, height) => {
		return getYPosForPercentage(y0, height) - 0.035 * height;
	}

	$: labelMetadata = tweenedCoords
		.filter(({loveSongType}) => loveSongType !== LOVE_SONG_TYPE_CONSTANTS.notALoveSong)
		.reduce((acc, { loveSongType, svgCoords }) => {
			const MIN_Y_HEIGHT_TO_FIT_LABEL = 0.04;
			// TEMP: we don't want to place labels on the very left (first) decade, since that's where the 60s annotations goes
			const {x, y0, y1} = svgCoords.find(({y0, y1}) => (y0 - y1) >= MIN_Y_HEIGHT_TO_FIT_LABEL) || {};
			if (!x) return acc;

			return [... acc, {
				loveSongType,
				x: getX(x, $viewport.width),
				y: getY(y0, y1, loveSongType, $viewport.height),
				opacity: $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 0 : 1,
				// TODO: fixed by Michelle! use normal css-case even in svelte properties on components.
				fontSize: (y0 - y1) < 2 * MIN_Y_HEIGHT_TO_FIT_LABEL ? "clamp(0.5rem, 2vw, .75rem)" : "clamp(1rem, 2vw, 1.25rem)"
			}]
		}, []);

	$: show = $currentStoryStep.showXAxis && !$currentStoryStep.isFinalComparisonStep && !$aSingleLoveSongTypeIsSpotlighted;
</script>

{#if show}
	<NonLoveSongLabel />
	{#each labelMetadata as { loveSongType, x, y, opacity, fontSize }}
		<div class={$currentStoryStep.allowUserToChangeFilters ? '' : 'no-pointer-events' } style:left={`${x}px`} style:top={`${y}px`} fill="black" style:opacity={opacity} style:font-size={fontSize}>
			{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
			<LoveSongTypeCategoryButtons loveSongType={loveSongType} />
		</div>
	{/each}	
{/if}

<style>
    div {
		font-family: 'Atlas Grotesk', sans-serif;
		/* font-size: clamp(1rem, 2vw, 1.25rem); */
		position: fixed;
	}

	div.no-pointer-events {
		pointer-events: none;
	}
</style>