<script>
    import { fade } from 'svelte/transition'

    import viewport from '$stores/viewport';
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
    import { getYPosForPercentage } from '$stores/forcePositionOptions-helper';

	import SongInfo from "./SongInfo.svelte";

    import variables from '$data/variables.json';
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	
    $: layoutData = $songAnnotationsWithPosition
        .filter(({audioFile}) => audioFile) 
        .map(({x, y, song, alternateTitle, audioFile}, index, fullArray) => {
            const threeSongs = fullArray.length === 3;
            const xTranslation = x > (0.8 * $viewport.width) ? '-100' : x < (0.2 * $viewport.width) ? '0' : '-50';
            const placeBelow = threeSongs && index === 1;
            const yOffset = (placeBelow ? 0.1 : 0.2) * $viewport.height;
            const textY = getYPosForPercentage(0.5, $viewport.height) - yOffset;
            return {bubbleX: x, bubbleY: y, textY, song, xTranslation, placeBelow, alternateTitle, audioFile}
        })
</script>

{#each layoutData as {bubbleX, textY, song, xTranslation, placeBelow, alternateTitle, audioFile}}
    <div
        id={song[SONG_DATA_COLUMNS_ENUM.song]}
        class="annotation-wrapper"
        role="tooltip"
        in:fade={{delay: variables.chart['transition-opacity-duration'] / 2, duration: variables.chart['transition-opacity-duration'] / 2 }}
        style={`top: ${textY}px; left: ${bubbleX}px; transform: translateX(${xTranslation}%) translateY(-${'100'}%);`}
    >
        <SongInfo song={song} alternateTitle={alternateTitle} audioFile={audioFile} />
    </div>
{/each}

<!-- For each layoutData, use html to draw a line extending from bubbleX/Y up to textY with thickness 3 pixels -->

{#each layoutData as {bubbleX, bubbleY, textY}}
    <div
        class="annotation-line"
        in:fade={{delay: variables.chart['transition-opacity-duration'] / 2, duration: variables.chart['transition-opacity-duration'] / 2 }}
        style={`top: ${textY}px; left: ${bubbleX}px; height: ${bubbleY - textY}px;`}
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