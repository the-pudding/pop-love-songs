<script>
	import { onMount } from "svelte";

	import Header from "./Header.svelte";
	import InteractivityControlsAndFilters from "./search/InteractivityControlsAndFilters.svelte";
	import SnakeAndBubbleChart from "./viz/SnakeAndBubble.Chart.svelte";
	import HeadlinesAboutLoveSongDecline from "./story-steps/HeadlinesAboutLoveSongDecline.svelte";
	import OpeningComment from "./story-steps/OpeningComment.svelte";
	import TitleCard from "./story-steps/TitleCard.svelte";
	import StoryStepNavigationAndText from "./story-steps/StoryStepNavigationAndText.svelte";
	import FooterEquivalentEndThingy from "./story-steps/FooterEquivalentEndThingy.svelte"
	
	import Annotations from "./viz/annotations/Annotations.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";

	import Audio from "./audio/Audio.svelte";

	import { playing } from "$stores/audio.js";
	import { currentStoryStep, currentStoryStepIndex, showSearchBars } from "$stores/storySteps";
	import loadImage from "$utils/loadImage";
	import { TITLE_CARD_BACKGROUND_IMAGE } from "./story-steps/images";
	
	// Wait until after we've mounted (and thus pulled the story step from the URL)
	// TODO: this doesn't seem to actually work. Instead, just create a store that StoryStepNavigationAndText updates
	let urlParsed = false
	onMount(() => {
	   urlParsed = true;
	   // @michelle: is this where this should go? also is this the proper use? 
	   // I want images not to look like they're awkwardly loading in, so why not do this for ALL big-ish images?
	   loadImage(TITLE_CARD_BACKGROUND_IMAGE.src);
    });
</script>

{#if $currentStoryStepIndex === 0}
	<Header />
{/if}

<article>
	{#if $showSearchBars}
		<InteractivityControlsAndFilters />
	{/if}

	{#if urlParsed}
		<!-- TODO: OPTIMIZATION: does it make sense to rip the viz elements on/off the dom, or just leave them there always? -->
		{#if !$currentStoryStep.showFooter}
			<SnakeAndBubbleChart />
		{/if}
			
		{#if $currentStoryStep.showHeadlinesAboutLoveSongDecline}
			<HeadlinesAboutLoveSongDecline />
		{:else if $currentStoryStep.showOpeningComment}
			<OpeningComment />
		{:else if $currentStoryStep.showTitleCard}
			<TitleCard />
		{:else if $currentStoryStep.showFooter}
			<FooterEquivalentEndThingy />
		{/if}
	{/if}

	<StoryStepNavigationAndText />
	<Annotations />
	<SongTooltip />

	<Audio audioFile={$playing?.audioFile} onComplete={() => $playing = undefined} />
</article>