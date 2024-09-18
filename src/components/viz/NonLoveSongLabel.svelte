<script>
	import { getXPosForYear } from "$data/data-utils";
	import { MAX_DATE, MIN_DATE } from "$data/songs-data";
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { currentStoryStep, isLastStep } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
    import viewport from "$stores/viewport";
	import ToggleLoveSongCategoryButtons from "./ToggleLoveSongCategoryButtons.svelte";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";

    const midDate = MIN_DATE + (MAX_DATE - MIN_DATE) / 2;
    $: x = getXPosForYear(midDate, $viewport.width);
    const Y_PADDING = 0.04;
    $: y = getYPosForPercentage(0 + Y_PADDING, $viewport.height);
    $: fontSize = $viewport.isLikelyInMobileLandscape ? 12 : 16;

    $: visible = $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(LOVE_SONG_TYPE_CONSTANTS.notALoveSong)
    $: style = `left: ${x}px; top: ${y}px; font-size: ${fontSize}px;`;
</script>

<div class:visible={visible} {style}>
    NON-LOVE SONGS{isLastStep && !!$typesTreatedAsNonLoveSongs.length ? ":" : ""}
</div>

<style>
    div {
        position: fixed;
        transform: translateX(-50%);

        font-family: 'Inter', sans-serif;
        font-weight: 600;
        color: gray;
        letter-spacing: 6px;
        /* TODO: @michelle it's not working now, but I'd like this to delay and/or fade in */
        transition: opacity calc(var(--chart-transition-opacity-duration) * 1ms) ease;
        transition-delay: 800ms;
    }

    div.visible {
        opacity: 1;
    }
</style>