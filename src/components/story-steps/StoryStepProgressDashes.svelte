<script>
    import { LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
    import { storySteps, currentStoryStepIndex, spotlightedTypeByIndex } from "$stores/storySteps";

    $: getBackgroundColor = (index) => {
        if (index <= $currentStoryStepIndex) {
            if (index === $currentStoryStepIndex) {
                return 'black';
            } else if (spotlightedTypeByIndex[index]) {
                return LOVE_SONG_TYPE_COLOR_MAP[spotlightedTypeByIndex[index]];
            } 
        }
        return 'rgba(0, 0, 0, 0.2)';
    }
</script>

<div class="progress-bar">
    {#each storySteps as _, index}
        <div 
            class="dash" 
            style="background-color: {getBackgroundColor(index)}">
        </div>
    {/each}
</div>

<style>
    .progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 16px; /* TODO */

        display: flex;
        gap: 4px;

        z-index: 1000;
    }

    .dash {
        flex: 1;
        height: 4px;
    }
</style>
