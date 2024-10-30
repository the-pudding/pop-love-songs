<script>
    import { LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
    import { storySteps, currentStoryStepIndex, spotlightedTypeByIndex } from "$stores/storySteps";

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

    $: getMarginTop = (index) => {
        if (index === $currentStoryStepIndex) {
            return `-${BORDER_THICKNESS}px`;
        }
        return '0px';
    }

    function handleClick(index) {
        currentStoryStepIndex.set(index);
    }
</script>

<!-- Note that this progress bar is hidden from tab/screen readers. It's likely just to hamper navigation, not improve it, cuz it's so long -->
<div class="progress-bar" aria-hidden="true">
    {#each storySteps as _, index}
        <button
            class="dash"
            tabindex="-1"
            style={`
                background-color: ${getBackgroundColor(index)};
                border: ${getBorderColor(index)};
                margin-top: ${getMarginTop(index)};
            `}
            on:click={() => handleClick(index)}
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

    /* Don't want default style */
    button {
        all: unset;
    }

    button.dash {
        flex: 1;
        height: 8px;
        transition: transform 0.2s ease-in-out;
    }

    button.dash:hover {
        transform: scaleY(2);
    }
</style>
