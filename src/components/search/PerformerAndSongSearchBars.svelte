<script>
	import SnakeBubbleToggle from "$components/viz/search-and-filter-top-bar/SnakeBubbleToggle.svelte";
import { getXPosForYear } from "$data/data-utils";
	import { MIN_DATE } from "$data/songs-data";

	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	import { isLastStep } from "$stores/storySteps";
	import viewport from "$stores/viewport";

	import PerformerSearchBar from "./PerformerSearchBar.svelte";
	import SongSearchBar from "./SongSearchBar.svelte";

    $: left = getXPosForYear(MIN_DATE, $viewport.width);
    $: top = getYPosForPercentage(0, $viewport.height);
</script>

<div style={`left: ${left}px; top: ${top}px;`}>
    <PerformerSearchBar />
    <SongSearchBar />
    {#if $isLastStep}
        <SnakeBubbleToggle />
    {/if}
</div>

<style>
    div {
        position: fixed;

        display: flex;
        justify-content: space-between;
        z-index: 1000;
    }
</style>