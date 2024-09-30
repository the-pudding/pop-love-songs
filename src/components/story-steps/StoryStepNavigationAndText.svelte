<script>
    import {afterUpdate, onMount, tick} from "svelte";
    import urlParams from "../../utils/urlParams.js";
    import viewport from "$stores/viewport.js";

    import Tap from "../helpers/CustomTap.svelte";

    import { selectedSongs, selectedPerformers, typesTreatedAsNonLoveSongs, showAggregateSnakeChart, songSearchString, performerSearchString } from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex, currentStoryStep} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_TOP_PADDING} from "$components/viz/viz-utils.js"
	import DataMethodsModal from "./DataMethodsModal.svelte";
	import { outermostMargin } from "$stores/canvasPosition.js";

    function updateQueryParams() {
        urlParams.set("step", $currentStoryStepIndex);
    }

    // Find button in gDoc text that opens modal
    let showModal = false;
    let container;
    const addModalOpenButtonListener = () => {
        const modalOpenButton = container && container.querySelector('.modalTrigger')
        if (modalOpenButton) {
            modalOpenButton.addEventListener('click', () => {
                showModal = true;
            })
        }
    }

    afterUpdate(() => {
        updateQueryParams();
        addModalOpenButtonListener();
    });
    
    onMount(async () => {
       const urlIndex = parseInt(urlParams.get("step")?.toString() || "0");
       $currentStoryStepIndex = urlIndex > storySteps.length - 1 ? 0 : urlIndex;

       await tick();
       addModalOpenButtonListener();
    });

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
        // clear any selections if you navigate to a new story step (story steps don't ever directly set these)
        selectedSongs.set([]) 
        selectedPerformers.set([])
        // als clear any user input text
        songSearchString.set("")
        performerSearchString.set("")
        
        typesTreatedAsNonLoveSongs.set([...$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs])
        showAggregateSnakeChart.set($currentStoryStep.visualEncodings.showAggregateSnakeChart)
    }

    $: $currentStoryStepIndex, updateFilterFilterState();

    $: style = `
        ${$currentStoryStep.showOpeningComment ? "" : `height: ${STORY_STEP_CONTROLLER_TOP_PADDING}px;`}
        margin-top: ${$outermostMargin}px;
        ${$currentStoryStep.showOpeningComment ? "bottom: 0" : "top: 0"}px;
    `
    
    $: storyTextStyle = `
        font-size: ${$viewport.isLikelyInMobileLandscape ? '14px' : '16px'};
        /* cream + transparency so the text stays readable */
        ${$currentStoryStep.chartOccupiesFullScreen ? "background-color: #fff6dfbf;" : ""}
    `
</script>

<div bind:this={container} class="container" style={style}>
    {#if !!$currentStoryStep.text}
        <h4 class="story-text" style={storyTextStyle}>
            <!-- For styling of love song type spans within the text, see app.css -->
            {@html $currentStoryStep.text}
            <DataMethodsModal bind:showModal />
        </h4>
    {/if}
</div>

<Tap on:tap={onTap} enableKeyboard={true} />

<style>
    .container {
        position: fixed;
        width: 100%;
        padding-left: 5%; 
        padding-right: 5%;
        /* TODO: there's probably a better way to place this with the correct margin (only matters on the first screen) */
        margin-bottom: 4%;

        pointer-events: none;
        border: none; /* this fixes the random border that appeared on mobile */
    }

    .story-text {
        max-width: 800px;
        margin: 0 auto;
        padding: 12px;
        /* I want visual padding, but I need to keep the text very close to the top, since it's a tight squeeze with the chart */
        padding-top: 4px;
        margin-top: -8px;
        padding-bottom: 4px;
        padding-left: 12px;
        padding-right: 12px;

        border-radius: 8px;
        border: none; /* this fixes the random border that appeared on mobile */

        pointer-events: all;
    }
</style>