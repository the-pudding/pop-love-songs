<script>
	import { onMount } from "svelte";

	import OrientationWarningModal from "./orientation-warning-modal/OrientationWarningModal.svelte";
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

	import viewport from "$stores/viewport";
	import { playing } from "$stores/audio.js";
	import { currentStoryStep, currentStoryStepIndex, showSearchBars } from "$stores/storySteps";
	import { loadRemainingImages, loadFirstImage } from "./story-steps/images";
	import Figure from "./figure/Figure.svelte";
	import StoryStepProgressDashes from "./story-steps/StoryStepProgressDashes.svelte";
	
	// TODO: this doesn't seem to actually work. Instead, just create a store that StoryStepNavigationAndText updates
	let ready = false
	onMount(async () => {
		await loadFirstImage();
		
		ready = true;
		loadRemainingImages();
	});
</script>

{#if $viewport.ready && ready}
	<OrientationWarningModal />

	{#if $currentStoryStepIndex === 0}
		<Header />
	{/if}

	<article>
		<StoryStepProgressDashes />

		{#if $currentStoryStep.showOpeningComment}
				<OpeningComment />
		{/if}
		<StoryStepNavigationAndText />
		
		{#if $showSearchBars}
			<InteractivityControlsAndFilters />
		{/if}

		<Figure>
			<SnakeAndBubbleChart />
		</Figure>
			
		{#if $currentStoryStep.showHeadlinesAboutLoveSongDecline}
			<HeadlinesAboutLoveSongDecline />
		{:else if $currentStoryStep.showTitleCard}
			<TitleCard />
		{:else if $currentStoryStep.showFooter}
			<FooterEquivalentEndThingy />
		{/if}

		<Annotations />
		<SongTooltip />

		<Audio audioFile={$playing?.audioFile} onComplete={() => $playing = undefined} />
	</article>
{/if}