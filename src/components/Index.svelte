<script>
	import { onMount } from "svelte";

	import PerformerAndSongSearchBars from "./search/PerformerAndSongSearchBars.svelte";
	import SnakeAndBubbleChart from "./viz/SnakeAndBubble.Chart.svelte";
	import HeadlinesAboutLoveSongDecline from "./story-steps/HeadlinesAboutLoveSongDecline.svelte";
	import OpeningComment from "./story-steps/OpeningComment.svelte";
	import TitleCard from "./story-steps/TitleCard.svelte";
	import SideBar from "./viz/SideBar.svelte";
	import StoryStepNavigationAndText from "./story-steps/StoryStepNavigationAndText.svelte";
	
	import SongAnnotations from "./viz/SongAnnotations.svelte";
	import PlayableSongAnnotations from "./viz/PlayableSongAnnotations.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import Audio from "./audio/Audio.svelte";
	
	
	import { currentStoryStep, currentStoryStepIndex, showSearchBars } from "$stores/storySteps";
	import { playing } from "$stores/audio.js";
	// TODO: disable devMode in production
	import devMode from "$stores/devMode";
	import Header from "./Header.svelte";
	
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

{#if $currentStoryStepIndex === 0}
	<Header />
{/if}

<article>
	{#if $devMode || $showSearchBars}
		<PerformerAndSongSearchBars />
	{/if}

	{#if urlParsed}
		<!-- TODO: OPTIMIZATION: does it make sense to rip the viz elements on/off the dom, or just leave them there always? -->
		<SnakeAndBubbleChart />
		{#if $currentStoryStep.showHeadlinesAboutLoveSongDecline}
			<HeadlinesAboutLoveSongDecline />
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