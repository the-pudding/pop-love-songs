<script>
	import { onMount } from "svelte";

	import MainViz from "./viz/MainViz.svelte";
	import BoomerBobImages from "./story-steps/BoomerBobImages.svelte";
	import OpeningComment from "./story-steps/OpeningComment.svelte";
	import TitleCard from "./story-steps/TitleCard.svelte";
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
	// TODO: this doesn't seem to actually work. Instead, just create a store that StoryStepController updates
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
	<!-- TODO: OPTIMIZATION: does it make sense to rip the viz elements on/off the dom, or just leave them there always? -->
	<MainViz />
	{#if $currentStoryStep.showBoomerBobImages}
		<BoomerBobImages />
	{:else if $currentStoryStep.showOpeningComment}
		<OpeningComment />
	{:else if $currentStoryStep.showTitleCard}
		<TitleCard />
	{/if}
{/if}

{#if $devMode}
	<SideBar />
{/if}
<StoryStepController />
<SongAnnotations />
<SongTooltip />
