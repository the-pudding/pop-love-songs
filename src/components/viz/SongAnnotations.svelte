<script>
    import { tweened } from "svelte/motion";
	import { cubicInOut } from "svelte/easing";

    import viewport from "$stores/viewport";

    import { annotatedSongsData } from "$stores/dataDerivations";
	import SongInfo from "./SongInfo.svelte";
	import { getXPosForYear } from "$data/data-utils";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	import { CHART_TRANSITION_OPACITY_DURATION } from "./viz-utils";


    $: y = $viewport.height / 2;

    const ANNOTATION_WIDTH = 200;
    $: getXPos = (song) => {
        const xPos = getXPosForYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal], $viewport.width);
        const xOffset =  ANNOTATION_WIDTH > $viewport.width - xPos ? - ANNOTATION_WIDTH : 10;
        return xPos + xOffset
    }

    // create a reactive value that calculates the x position for each annotaiton, then if any overlap, it gives sets the y position with a negative offset
    $: layoutData = $annotatedSongsData.map(({song}, i) => {
        const xPos = getXPos(song);
        // check if we're at the last element
        if (i === $annotatedSongsData.length - 1) {
            return {xPos, yOffset: 0, song}
        }
        const nextXPos = getXPos($annotatedSongsData[i + 1].song);
        return {xPos, yOffset: nextXPos - xPos < ANNOTATION_WIDTH ? -180 : 0, song}
    })

    // @michelle: is it better to just use CSS transition?
    const opacity = tweened(0, {duration: CHART_TRANSITION_OPACITY_DURATION, easing: cubicInOut});
    $: {
        opacity.set($annotatedSongsData.length ? 1 : 0)
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
		background-color: white;
		border: 1px solid black;
		padding: 0.5rem;
	}
</style>