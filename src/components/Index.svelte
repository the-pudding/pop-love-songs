<script>
	import { onMount } from "svelte";

	import MainViz from "./viz/MainViz.svelte";
	import SideBar from "./viz/SideBar.svelte";
	import StoryStepController from "./story-steps/StoryStepController.svelte";
	
	import SongAnnotations from "./viz/SongAnnotations.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	
	import SearchAndFilterTopBar from "./viz/search-and-filter-top-bar/SearchAndFilterTopBar.svelte";
	
	import { currentStoryStep } from "$stores/storySteps";
	// TODO: disable devMode in production
	import devMode from "$stores/devMode";
	
	
	$: handleKeyPress = (e) => {
		if (e.key === "d") {
			devMode.update((devMode) => !devMode);
		}
	};

	// Wait until after we've mounted (and thus pulled the story step from the URL)
	let urlParsed = false
	onMount(() => {
	   urlParsed = true;
    });
</script>

<svelte:window on:keydown={handleKeyPress} />

{#if $devMode || $currentStoryStep.allowUserToChangeFilters}
	<SearchAndFilterTopBar />
{/if}

{#if urlParsed}
	<MainViz />
{/if}

{#if $devMode}
	<SideBar />
{/if}
<StoryStepController />
<SongAnnotations />
<SongTooltip />
