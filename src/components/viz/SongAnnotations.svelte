<script>
    import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";

    import viewport from "$stores/viewport";

    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import SongInfo from "./SongInfo.svelte";
	import { CHART_TRANSITION_OPACITY_DURATION } from "./viz-utils";

    $: y = $viewport.height / 2;

    const ANNOTATION_WIDTH = 200;
    $: getXPos = (x) => {
        const xOffset =  ANNOTATION_WIDTH > $viewport.width - x ? - ANNOTATION_WIDTH : 10;
        return x + xOffset
    }

    // create a reactive value that calculates the x position for each annotaiton, then if any overlap, it gives sets the y position with a negative offset
    $: layoutData = $songAnnotationsWithPosition.map(({song, x, y}, i) => {
        const xPos = getXPos(x);
        // check if we're at the last element
        if (i === $songAnnotationsWithPosition.length - 1) {
            return {xPos, yOffset: 0, song}
        }
        const nextXPos = getXPos($songAnnotationsWithPosition[i + 1].x);
        return {xPos, yOffset: nextXPos - xPos < ANNOTATION_WIDTH ? -180 : 0, song}
    })

    // @michelle: is it better to just use CSS transition?
    const opacity = tweened(0, {duration: CHART_TRANSITION_OPACITY_DURATION, easing: cubicInOut});
    $: {
        opacity.set($songAnnotationsWithPosition.length ? 1 : 0)
    }
</script>

{#each layoutData as {xPos, yOffset, song}}
    <div
        class="annotation-wrapper"
        role="tooltip"
        style={`top: ${y + yOffset}px; left: ${xPos}px; opacity: ${$opacity}`}
    >
        <SongInfo song={song} />
    </div>
    
{/each}



<style>
	div.annotation-wrapper {
		z-index: 10000;
		position: absolute;
		width: 200px;
		max-height: 300px;
		background-color: transparent;
    }
</style>