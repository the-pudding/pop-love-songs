<script>
    import {afterUpdate, onMount} from "svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    import Tap from "../helpers/Tap.svelte";

    import {selectedGenders, selectedSongs, selectedLoveSongTypes, selectedPerformers, timeRange, columnsToFilterVisibilityOn, visibleButNotSelectedLoveSongTypes, typesTreatedAsNonLoveSongs} from "$stores/searchAndFilter.js"
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

    const onTap = ({ detail }) => {
		detail === "right" ? onNextButtonClick() : onPreviousButtonClick();
	};

    const updateFilterFilterState = () => {
        selectedSongs.set([...$currentStoryStep.searchAndFilterState.selectedSongs])
        selectedGenders.set([...$currentStoryStep.searchAndFilterState.selectedGenders])
        selectedLoveSongTypes.set([...$currentStoryStep.searchAndFilterState.selectedLoveSongTypes])
        selectedPerformers.set([...$currentStoryStep.searchAndFilterState.selectedPerformers])
        timeRange.set({...$currentStoryStep.searchAndFilterState.timeRange})
        
        columnsToFilterVisibilityOn.set([...$currentStoryStep.searchAndFilterState.columnsToFilterVisibilityOn])
        visibleButNotSelectedLoveSongTypes.set([...$currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes])
        typesTreatedAsNonLoveSongs.set([...$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs])
    }

    $: $currentStoryStepIndex, updateFilterFilterState()
</script>


{#if $currentStoryStep.loveSongTypeDefinitionImage}
    <img src={`assets/${$currentStoryStep.loveSongTypeDefinitionImage}.png`} alt="love song definition table" />
{/if}

<div class="container" style:height={`${STORY_STEP_CONTROLLER_BOTTOM_PADDING}px`}>
    <h4 class="title">
        {$currentStoryStep.text}
        {#if $currentStoryStep.showLoveSongChange}
            [Last 10 years vs 60s: <b>{$formattedChange}% point change</b>]
        {/if}
    </h4>
</div>

<Tap on:tap={onTap} debug={false} enableKeyboard={true} showArrows={true} />

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

    .title {
        text-align: center;
        background-color: var(--color-gray-300);
        /* If screen width is less 1000 shrink font size */
        font-size: clamp(1rem, 2vw, 1.5rem);
    }
</style>