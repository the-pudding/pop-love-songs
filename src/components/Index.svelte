<script>
	import { onMount } from "svelte";

	import PerformerAndSongSearchBars from "./search/PerformerAndSongSearchBars.svelte";
	import SnakeAndBubbleChart from "./viz/SnakeAndBubble.Chart.svelte";
	import HeadlinesAboutLoveSongDecline from "./story-steps/HeadlinesAboutLoveSongDecline.svelte";
	import OpeningComment from "./story-steps/OpeningComment.svelte";
	import TitleCard from "./story-steps/TitleCard.svelte";
	import StoryStepNavigationAndText from "./story-steps/StoryStepNavigationAndText.svelte";
	
	import AdjacentAnnotations from "./viz/AdjacentAnnotations.svelte";
	import OffsetAnnotations from "./viz/OffsetAnnotations.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import Audio from "./audio/Audio.svelte";
	
	import { currentStoryStep, currentStoryStepIndex, showSearchBars } from "$stores/storySteps";
	import { aSearchFilterExists } from "$stores/searchAndFilter";
	import { playing } from "$stores/audio.js";
	import Header from "./Header.svelte";

	// Wait until after we've mounted (and thus pulled the story step from the URL)
	// TODO: this doesn't seem to actually work. Instead, just create a store that StoryStepNavigationAndText updates
	let urlParsed = false
	onMount(() => {
	   urlParsed = true;
    });
</script>

{#if $currentStoryStepIndex === 0}
	<Header />
{/if}

<article>
	{#if $showSearchBars}
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

	<StoryStepNavigationAndText />
	{#if !$aSearchFilterExists}
		<AdjacentAnnotations />
		<OffsetAnnotations />
	{/if}
	<SongTooltip />

	<Audio audioFile={$playing?.audioFile} onComplete={() => $playing = undefined} />
</article>