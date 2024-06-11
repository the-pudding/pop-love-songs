<script>
    import {afterUpdate, onMount} from "svelte";
    import urlParams from "../../utils/urlParams.js";

    import Tap from "../helpers/Tap.svelte";
    import BoomerBobImages from "./BoomerBobImages.svelte";
    import LoveSongDefinitionTable from "../love-song-definition-table/LoveSongDefinitionTable.svelte";

    import {selectedGenders, selectedSongs, selectedPerformers, typesTreatedAsNonLoveSongs, showAggregateSnakeChart} from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex, currentStoryStep} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_BOTTOM_PADDING} from "$components/viz/viz-utils.js"
	
    // Story index synced to query params:
    const STEP_QUERY_PARAM = "step"
    const searchParams = new URLSearchParams("step=0");

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
        selectedGenders.set([...$currentStoryStep.searchAndFilterState.selectedGenders])
        selectedPerformers.set([...$currentStoryStep.searchAndFilterState.selectedPerformers])
        
        typesTreatedAsNonLoveSongs.set([...$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs])
        showAggregateSnakeChart.set($currentStoryStep.visualEncodings.showAggregateSnakeChart)
    }

    $: $currentStoryStepIndex, updateFilterFilterState()
</script>


{#if $currentStoryStep.showBoomerBobImages}
    <BoomerBobImages />
{/if}

{#if $currentStoryStep.showLoveSongTypeTableWithThisHighlighted}
    <LoveSongDefinitionTable />
{/if}

<div class="container" style:height={`${STORY_STEP_CONTROLLER_BOTTOM_PADDING}px`}>
    <h4 class="title">
        {$currentStoryStep.text}
    </h4>
</div>

<Tap on:tap={onTap} debug={false} enableKeyboard={true} showArrows={true} />

<style>
    .container {
        position: fixed;
        bottom: 0px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        
        pointer-events: none;
    }

    .title {
        text-align: center;
        background-color: var(--color-gray-300);
        /* If screen width is less 1000 shrink font size */
        font-size: clamp(1rem, 2vw, 1.5rem);
    }
</style>