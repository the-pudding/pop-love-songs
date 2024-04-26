<script>
    import {afterUpdate, onMount} from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import {selectedGenders, selectedSongs, selectedLoveSongTypes, selectedPerformers, timeRange, columnsToFilterVisibilityOn, visibleButNotSelectedLoveSongTypes} from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex, currentStoryStep} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_BOTTOM_PADDING} from "$components/viz/viz-utils.js"
	import { formattedChange } from "$stores/dataDerivations";
    
    // Story index synced to query params:
    const searchParams = new URLSearchParams("currentStoryStepIndex=0");

    onMount(() => {
       const urlIndex = parseInt($page.url.searchParams.get("currentStoryStepIndex")?.toString() || "0");
       $currentStoryStepIndex = urlIndex; // TODO: there's a bug where, after refresh, the filters from the first step are still in the filter bar, though not applied
    });

    function updateQueryParams() {
        searchParams.set("currentStoryStepIndex", $currentStoryStepIndex);
        goto(`?${searchParams.toString()}`);
    }

    afterUpdate(updateQueryParams);

    // Buttons
    const onPreviousButtonClick = () => {
        if ($currentStoryStepIndex > 0) $currentStoryStepIndex--;
    }
    const onNextButtonClick = () => {
        if ($currentStoryStepIndex < storySteps.length - 1) $currentStoryStepIndex++;
    }

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") {
            onPreviousButtonClick()
        } else if (e.key === "ArrowRight") {
            onNextButtonClick()
        }
    }

    const updateFilterFilterState = () => {
        selectedSongs.set([...$currentStoryStep.searchAndFilterState.selectedSongs])
        selectedGenders.set([...$currentStoryStep.searchAndFilterState.selectedGenders])
        selectedLoveSongTypes.set([...$currentStoryStep.searchAndFilterState.selectedLoveSongTypes])
        selectedPerformers.set([...$currentStoryStep.searchAndFilterState.selectedPerformers])
        timeRange.set({...$currentStoryStep.searchAndFilterState.timeRange})
        
        columnsToFilterVisibilityOn.set([...$currentStoryStep.searchAndFilterState.columnsToFilterVisibilityOn])
        visibleButNotSelectedLoveSongTypes.set([...$currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes])
    }

    $: $currentStoryStepIndex, updateFilterFilterState()
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if $currentStoryStep.loveSongTypeDefinitionImage}
    <img src={`assets/${$currentStoryStep.loveSongTypeDefinitionImage}.png`} alt="love song definition table" />
{/if}

<div class="container" style:height={`${STORY_STEP_CONTROLLER_BOTTOM_PADDING}px`}>
    <h4 class="title">
        {$currentStoryStep.text}
        {#if $currentStoryStep.showLoveSongChangeOverTime}
            [Change since 60s: <b>{$formattedChange}</b>]
        {/if}
    </h4>
    <div>
        <button on:click={onPreviousButtonClick} disabled={$currentStoryStepIndex <= 0}>previous</button>
        <button on:click={onNextButtonClick} disabled={$currentStoryStepIndex >= storySteps.length - 1}>...next!</button>
    </div>
</div>

<style>
    img {
        position: fixed; 
        max-height: 80%;
        top: 0; 
        left: 0;
        z-index: 100000000000;
    }
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

    button {
        pointer-events: all;
    }

    .title {
        text-align: center;
        background-color: var(--color-gray-300);
    }
</style>