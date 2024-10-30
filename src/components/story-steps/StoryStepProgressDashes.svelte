<script>
    import { LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
    import { storySteps, currentStoryStepIndex, spotlightedTypeByIndex } from "$stores/storySteps";
	import { get } from "svelte/store";

    const UNVIEWED_OPACITY = 0.05;
    $: getBackgroundColor = (index) => {
        if (index <= $currentStoryStepIndex) {
            if (spotlightedTypeByIndex[index]) {
                return `${LOVE_SONG_TYPE_COLOR_MAP[spotlightedTypeByIndex[index]]}`;
            } 
            return '#d3d3d3';
        }
        return `rgba(0, 0, 0, ${UNVIEWED_OPACITY})`;
    }

    const BORDER_THICKNESS = 4;
    $: getBorderColor = (index) => {
        if (index === $currentStoryStepIndex) {
            return `${BORDER_THICKNESS}px solid ${getBackgroundColor(index)}`;
        }
        return '0px solid transparent';
    }

    $: getTransform = (index) => {
        if (index === $currentStoryStepIndex) {
            return `translateY(-${BORDER_THICKNESS / 2}px)`;
        }
        return 'translateY(0px)';
    }
</script>

<div class="progress-bar">
    {#each storySteps as _, index}
        <div 
            class="dash" 
            style={`
                background-color: ${getBackgroundColor(index)};
                border: ${getBorderColor(index)};
                transform: ${getTransform(index)};
            `}
        />
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
