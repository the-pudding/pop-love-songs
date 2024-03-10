<script>
    import {selectedGenres, selectedGenders, selectedSongs, selectedLoveSongTypes, selectedPerformers, timeRange, columnsToFilterVisibilityOn, visibleButNotSelectedLoveSongTypes} from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_BOTTOM_PADDING} from "$components/viz/viz-utils.js"

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
        selectedSongs.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedSongs])
        selectedGenders.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedGenders])
        selectedGenres.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedGenres])
        selectedLoveSongTypes.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedLoveSongTypes])
        selectedPerformers.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedPerformers])
        timeRange.set({...storySteps[$currentStoryStepIndex].searchAndFilterState.timeRange})
        
        columnsToFilterVisibilityOn.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.columnsToFilterVisibilityOn])
        visibleButNotSelectedLoveSongTypes.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.visibleButNotSelectedLoveSongTypes])
    }

    $: $currentStoryStepIndex, updateFilterFilterState()
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="container" style:height={`${STORY_STEP_CONTROLLER_BOTTOM_PADDING}px`}>
    <h4 class="title">{storySteps[$currentStoryStepIndex].text}</h4>
    <div>
        <button on:click={onPreviousButtonClick} disabled={$currentStoryStepIndex <= 0}>previous</button>
        <button on:click={onNextButtonClick} disabled={$currentStoryStepIndex >= storySteps.length - 1}>...next!</button>
    </div>
</div>

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

    button {
        pointer-events: all;
    }

    .title {
        text-align: center;
        background-color: var(--color-gray-300);
    }
</style>