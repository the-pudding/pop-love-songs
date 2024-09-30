<script>
	import SnakeBubbleToggle from "$components/search/SnakeBubbleToggle.svelte";
	import { MAX_DATE, MIN_DATE } from "$data/songs-data";
	import { bottomOfStoryText, getXPositionForYear } from "$stores/canvasPosition";

	import { isLastStep } from "$stores/storySteps";

	import PerformerSearchBar from "./PerformerSearchBar.svelte";
	import SongSearchBar from "./SongSearchBar.svelte";

    $: left = $getXPositionForYear(MIN_DATE);
    $: width = $getXPositionForYear(Math.floor(MAX_DATE)) - left;
    $: top = $bottomOfStoryText;
</script>

<div style={`left: ${left}px; top: ${top}px; width: ${width}px`}>
    <PerformerSearchBar />
    <SongSearchBar />
    {#if $isLastStep}
        <SnakeBubbleToggle />
    {/if}
</div>

<style>
    div {
        position: fixed;
        /* TODO: we probably want to lay out these within the whole app better (or just make the chart shorter on the last step */
        transform: translateY(-50%);
        
        display: flex;
        justify-content: space-between;
        z-index: 1000;
    }
</style>