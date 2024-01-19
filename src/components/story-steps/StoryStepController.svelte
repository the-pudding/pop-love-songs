<script>
    import searchAndFilter, {selectedGenres, selectedGenders, selectedSongs} from "$stores/searchAndFilter.js"
    import {storySteps, currentStoryStepIndex} from "$stores/storySteps.js"
    import {STORY_STEP_CONTROLLER_BOTTOM_PADDING} from "$components/viz/viz-utils.js"

    const onPreviousButtonClick = () => {
        $currentStoryStepIndex--;
    }
    const onNextButtonClick = () => {
        $currentStoryStepIndex++;
    }

    const updateFilterFilterState = () => {
        selectedSongs.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedSongs])
        selectedGenders.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedGenders])
        selectedGenres.set([...storySteps[$currentStoryStepIndex].searchAndFilterState.selectedGenres])
        searchAndFilter.set({...storySteps[$currentStoryStepIndex].searchAndFilterState})
    }

    $: $currentStoryStepIndex, updateFilterFilterState()
</script>

<div class="container" style:height={`${STORY_STEP_CONTROLLER_BOTTOM_PADDING}px`}>
    <h3 class="title">{storySteps[$currentStoryStepIndex].text}</h3>
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
        background-color: gray;
    }
</style>