<script>
    import {afterUpdate, onMount} from "svelte";
    import urlParams from "../../utils/urlParams.js";
    import viewport from "$stores/viewport.js";

    import Tap from "../helpers/Tap.svelte";
    import BoomerBobImages from "./BoomerBobImages.svelte";
    import OpeningComment from "./OpeningComment.svelte";

    import {selectedSongs, selectedPerformers, typesTreatedAsNonLoveSongs, showAggregateSnakeChart} from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex, currentStoryStep} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_TOP_PADDING} from "$components/viz/viz-utils.js"
    import { Y_MARGIN_SCREEN_PERCENTAGE } from "$data/data-utils.js";
	
    onMount(() => {
       const urlIndex = parseInt(urlParams.get("step")?.toString() || "0");
       $currentStoryStepIndex = urlIndex > storySteps.length - 1 ? 0 : urlIndex;
    });

    function updateQueryParams() {
        urlParams.set("step", $currentStoryStepIndex);
    }

    afterUpdate(updateQueryParams);

    // Buttons
    const onPreviousButtonClick = () => {
        if ($currentStoryStepIndex > 0) $currentStoryStepIndex--;
    }
    const onNextButtonClick = () => {
        if ($currentStoryStepIndex < storySteps.length - 1) $currentStoryStepIndex++;
    }

    const onTap = ({ detail }) => {
		detail === "right" ? onNextButtonClick() : onPreviousButtonClick();
	};

    const updateFilterFilterState = () => {
        selectedSongs.set([...$currentStoryStep.searchAndFilterState.selectedSongs])
        selectedPerformers.set([...$currentStoryStep.searchAndFilterState.selectedPerformers])
        
        typesTreatedAsNonLoveSongs.set([...$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs])
        showAggregateSnakeChart.set($currentStoryStep.visualEncodings.showAggregateSnakeChart)
    }

    $: $currentStoryStepIndex, updateFilterFilterState();

    const style = `height: ${STORY_STEP_CONTROLLER_TOP_PADDING}px; margin-top: ${$viewport.height * Y_MARGIN_SCREEN_PERCENTAGE}px;`
</script>


{#if $currentStoryStep.showBoomerBobImages}
    <BoomerBobImages />
{:else if $currentStoryStep.showOpeningComment}
    <OpeningComment />
{/if}

<div class="container" style={style}>
    <h4 class="title">
        {$currentStoryStep.text}
    </h4>
</div>

<Tap on:tap={onTap} debug={false} enableKeyboard={true} showArrows={true} />

<style>
    .container {
        position: fixed;
        top: 0px;
        width: 100%;
        padding-left: 5%; 
        padding-right: 5%;
    }

    .title {
        font-size: clamp(1rem, 2vw, 1.5rem);
    }
</style>