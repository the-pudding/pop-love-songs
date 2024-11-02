<script>
    import { LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
	import mq from "$stores/mq";
    import { storySteps, currentStoryStepIndex, loveSongTypeToShowInProgressBar } from "$stores/storySteps";

    const UNVIEWED_OPACITY = 0.4;
    const VIEWED_OPACITY = 1;
    $: getOpacity = (index) => {
        if (index <= $currentStoryStepIndex) {
            return VIEWED_OPACITY;
        } else {
            return UNVIEWED_OPACITY;
        }
    }

    $: getBackgroundColor = (index) => {
        if (index <= $currentStoryStepIndex && loveSongTypeToShowInProgressBar[index]) {
            return LOVE_SONG_TYPE_COLOR_MAP[loveSongTypeToShowInProgressBar[index]];
        }
        return '#d3d3d3';
    }

    function handleClick(index) {
        currentStoryStepIndex.set(index);
    }
</script>

<!-- Note that this progress bar is hidden from tab/screen readers. It'd likely just hamper navigation, not improve it. -->
<div class="progress-bar" aria-hidden="true" style={`gap: ${$mq.desktop ? 3 : 0 }px; padding: ${$mq.desktop ? 12 : 0 }px;`}>
    {#each storySteps as _, index}
        <button
            class="dash"
            tabindex="-1"
            style={`
                background-color: ${getBackgroundColor(index)};
                opacity: ${getOpacity(index)};
                border-radius: ${$mq.desktop ? 4 : 0}px;
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

        display: flex;

        z-index: 1000;
    }

    /* Don't want default style */
    button {
        all: unset;
    }

    button.dash {
        flex: 1;
        height: 4px;

        cursor: pointer;

        transition: transform 0.2s ease-in-out;
    }

    button.dash:hover {
        transform: scaleY(2);
    }
</style>
