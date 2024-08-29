<script>
    import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";

    import viewport from "$stores/viewport";

    import { currentStoryStep } from "$stores/storySteps";
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import SongInfo from "./SongInfo.svelte";
	import { CHART_TRANSITION_OPACITY_DURATION } from "./viz-utils";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

    const X_OFFSET = 24;
    const Y_OFFSET = 24;
    $: layoutData = $songAnnotationsWithPosition.map(({song, x, y, rightAlign}) => {
        const xPos = x + (rightAlign ? -1 : 1) * X_OFFSET;
        const yPos = y - Y_OFFSET;
        return {xPos, yPos, song, rightAlign}
    })

    // @michelle: is it better to just use CSS transition?
    const opacity = tweened(0, {duration: CHART_TRANSITION_OPACITY_DURATION, easing: cubicInOut});
    $: {
        opacity.set($songAnnotationsWithPosition.length ? 1 : 0)
    }
</script>

{#each layoutData as {xPos, yPos, song, rightAlign}}
    <div
        id={song[SONG_DATA_COLUMNS_ENUM.song]}
        class="annotation-wrapper"
        role="tooltip"
        style={`top: ${yPos}px; left: ${xPos}px; ${rightAlign ? 'transform: translateX(-100%);' : ''} opacity: ${$opacity};`}
    >
        <SongInfo song={song} />
    </div>
    
{/each}



<style>
	div.annotation-wrapper {
		z-index: 10000;
		position: absolute;
        /* transition: top 0.8s, left 0.8s; */
		max-height: 300px;
		background-color: transparent;
    }
</style>