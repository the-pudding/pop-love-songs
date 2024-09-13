<script>
	import { onMount } from "svelte";

	import SnakeAndBubbleChart from "./viz/SnakeAndBubble.Chart.svelte";
	import BoomerBobImages from "./story-steps/BoomerBobImages.svelte";
	import OpeningComment from "./story-steps/OpeningComment.svelte";
	import TitleCard from "./story-steps/TitleCard.svelte";
	import SideBar from "./viz/SideBar.svelte";
	import StoryStepNavigationAndText from "./story-steps/StoryStepNavigationAndText.svelte";
	
	import SongAnnotations from "./viz/SongAnnotations.svelte";
	import PlayableSongAnnotations from "./viz/PlayableSongAnnotations.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import Audio from "./audio/Audio.svelte";
	
	import SearchAndFilterTopBar from "./viz/search-and-filter-top-bar/SearchAndFilterTopBar.svelte";
	
	import { currentStoryStep } from "$stores/storySteps";
	import { playing } from "$stores/audio.js";
	// TODO: disable devMode in production
	import devMode from "$stores/devMode";
	
	$: handleKeyPress = (e) => {
		if (e.key === "d") {
			devMode.update((devMode) => !devMode);
		}
	};

	// Wait until after we've mounted (and thus pulled the story step from the URL)
	// TODO: this doesn't seem to actually work. Instead, just create a store that StoryStepNavigationAndText updates
	let urlParsed = false
	onMount(() => {
	   urlParsed = true;
    });
</script>

<svelte:window on:keydown={handleKeyPress} />

<article>
	{#if $devMode || $currentStoryStep.allowUserToChangeFilters}
		<SearchAndFilterTopBar />
	{/if}

	{#if urlParsed}
		<!-- TODO: OPTIMIZATION: does it make sense to rip the viz elements on/off the dom, or just leave them there always? -->
		<SnakeAndBubbleChart />
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
	<StoryStepNavigationAndText />
	<SongAnnotations />
	<PlayableSongAnnotations />
	<SongTooltip />

	<Audio audioFile={$playing?.audioFile} onComplete={() => $playing = undefined} />
</article>