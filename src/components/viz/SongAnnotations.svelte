<script>
    import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";

    import viewport from "$stores/viewport";

    import { currentStoryStep } from "$stores/storySteps";
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import SongInfo from "./SongInfo.svelte";
	import { CHART_TRANSITION_OPACITY_DURATION } from "./viz-utils";
	

    $: y = $viewport.height / 2;

    const ANNOTATION_WIDTH = 200;
    $: getXPos = (x) => {
        const xOffset =  ANNOTATION_WIDTH > $viewport.width - x ? - ANNOTATION_WIDTH : 10;
        return x + xOffset
    }

    $: getYPos = (y, isLastAnnotation, overlapsWithNext) => {
        if ($currentStoryStep.showXAxis) return !isLastAnnotation && overlapsWithNext ? y - 120 : y + 40;
        return y
    }

    // create a reactive value that calculates the x position for each annotaiton, then if any overlap, it gives sets the y position with a negative offset
    $: layoutData = $songAnnotationsWithPosition.map(({song, x, y}, i) => {
        const xPos = getXPos(x);
        const isLastAnnotation = i === $songAnnotationsWithPosition.length - 1;
        const nextXPos = isLastAnnotation ? null : getXPos($songAnnotationsWithPosition[i + 1].x);
        const overlapsWithNext = nextXPos - xPos < ANNOTATION_WIDTH;
        const yPos = getYPos(y, isLastAnnotation, overlapsWithNext)
        return {xPos, yPos, song}
    })

    // @michelle: is it better to just use CSS transition?
    const opacity = tweened(0, {duration: CHART_TRANSITION_OPACITY_DURATION, easing: cubicInOut});
    $: {
        opacity.set($songAnnotationsWithPosition.length ? 1 : 0)
    }
</script>

{#each layoutData as {xPos, yPos, song}}
    <div
        class="annotation-wrapper"
        role="tooltip"
        style={`top: ${yPos}px; left: ${xPos}px; opacity: ${$opacity}`}
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