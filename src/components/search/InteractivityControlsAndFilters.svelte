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

<div class="wrapper" style={`left: ${left}px; top: ${top}px; width: ${width}px`}>
    <div class="search-bars-wrapper">
        <PerformerSearchBar />
        <SongSearchBar />
    </div>
    {#if $isLastStep}
        <SnakeBubbleToggle />
    {/if}
</div>

<style>
    .wrapper {
        position: fixed;
        transform: translateY(-40%);
        
        display: flex;
        justify-content: space-between;
        z-index: 1000;
    }
    .search-bars-wrapper {
        display: flex;
        justify-content: space-between;
    }
</style>