<script>
    import { fade } from 'svelte/transition'

    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import SongInfo from "./SongInfo.svelte";
	import { CHART_TRANSITION_OPACITY_DURATION } from "./viz-utils";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

    const X_OFFSET = 24;
    const Y_OFFSET = 24;
    const getX = (x, rightAlign, placeBelow, placeAbove) => {  
        if (placeAbove) {
            return x - X_OFFSET * 2; // slide it more centered
        }
        if (placeBelow) {
            return x + X_OFFSET * 2; // slide it more centered
        }
        const direction = rightAlign ? -1 : 1
        return x + direction * X_OFFSET;
    }
    $: layoutData = $songAnnotationsWithPosition
        .filter(({audioFile}) => !audioFile) 
        .map(({song, x, y, rightAlign, placeBelow, placeAbove, alternateTitle}) => {
            const xPos = getX(x, rightAlign, placeBelow, placeAbove);
            const yPos = y - (placeBelow ? -40 : (placeAbove ? 60 : Y_OFFSET));
            return {xPos, yPos, song, rightAlign, alternateTitle}
        })
</script>

{#each layoutData as {xPos, yPos, song, rightAlign, alternateTitle}}
    <div
        id={song[SONG_DATA_COLUMNS_ENUM.song]}
        class="annotation-wrapper"
        role="tooltip"
        in:fade={{delay: CHART_TRANSITION_OPACITY_DURATION / 2, duration: CHART_TRANSITION_OPACITY_DURATION / 2 }}
        style={`top: ${yPos}px; left: ${xPos}px; ${rightAlign ? 'transform: translateX(-100%);' : ''}`}
    >
        <SongInfo song={song} alternateTitle={alternateTitle} />
    </div>
{/each}



<style>
	div.annotation-wrapper {
		z-index: 10000;
		position: absolute;
		max-height: 300px;
		background-color: transparent;
        transition: opacity 4s;
    }
</style>