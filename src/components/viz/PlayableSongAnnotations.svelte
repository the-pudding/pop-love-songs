<script>
    import { fade } from 'svelte/transition'

    import viewport from '$stores/viewport';
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";

	import SongInfo from "./SongInfo.svelte";

	import { CHART_TRANSITION_OPACITY_DURATION } from "./viz-utils";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	
    const X_OFFSET = 24;
    const getX = (x, rightAlign) => { 
        const direction = rightAlign ? -1 : 1
        return x + direction * X_OFFSET;
    }

    $: layoutData = $songAnnotationsWithPosition
        .filter(({audioFile}) => audioFile) 
        .map(({x, y, song, rightAlign, placeBelow, placeAbove, alternateTitle, audioFile}) => {
            const xPos = getX(x, rightAlign);
            const {height} = $viewport;
            const yOffset = 0.1 * height;
            const yPos = 0.5 * $viewport.height - (placeBelow ? - yOffset : (placeAbove ? yOffset : 0));
            return {bubbleX: x, bubbleY: y, xPos, yPos, song, rightAlign, alternateTitle, audioFile}
        })
</script>

{#each layoutData as {bubbleX, bubbleY, xPos, yPos, song, rightAlign, alternateTitle, audioFile}}
    <div
        id={song[SONG_DATA_COLUMNS_ENUM.song]}
        class="annotation-wrapper"
        role="tooltip"
        in:fade={{delay: CHART_TRANSITION_OPACITY_DURATION / 2, duration: CHART_TRANSITION_OPACITY_DURATION / 2 }}
        style={`top: ${yPos}px; left: ${xPos}px; ${rightAlign ? `transform: translateX(-100%);` : ''}`}
    >
        <SongInfo song={song} alternateTitle={alternateTitle} audioFile={audioFile} />
    </div>
{/each}

<!-- For each layoutData, use html to draw a line extending from bubbleX/Y up to x/yPos with thickness 3 pixels -->

{#each layoutData as {bubbleX, bubbleY, xPos, yPos, song, rightAlign, alternateTitle, audioFile}}
    <div
        class="annotation-line"
        in:fade={{delay: CHART_TRANSITION_OPACITY_DURATION / 2, duration: CHART_TRANSITION_OPACITY_DURATION / 2 }}
        style={`top: ${yPos}px; left: ${bubbleX}px; height: ${bubbleY - yPos}px;`}
    />
{/each}



<style>
    div {
        position: absolute;
        z-index: 10000;
    }

	div.annotation-wrapper {
		max-height: 300px;
    }

    div.annotation-line {
        background-color: black;
        width: 2px;
        margin-left: -0.5px;
    }
</style>