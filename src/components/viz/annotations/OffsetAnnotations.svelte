<script>
    import { fade } from 'svelte/transition'

    import viewport from '$stores/viewport';
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
    import { currentStoryStep } from '$stores/storySteps';
    import { getXPositionForYear, getYPositionForPercentage } from '$stores/canvasPosition';

	import SongInfo from "../SongInfo.svelte";

    import variables from '$data/variables.json';
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

    const aNonTrivialSize = (height) => Math.abs(height) > 16;
	
    const DEFAULT_OFFSET_REFERENCE = 0.5;
    $: offsetFromThisYPercentage = $currentStoryStep.visualEncodings.songAnnotations.offsetFromThisYPercentage || DEFAULT_OFFSET_REFERENCE;
    $: layoutData = $songAnnotationsWithPosition
        .filter(({offsetAnnotation}) => offsetAnnotation) 
        .map(({x, y, radius, song, alternateTitle, audioFile, offsetToThisYear}, index, fullArray) => {
            const threeSongs = fullArray.length === 3;
            const xTranslation = x > (0.8 * $viewport.width) ? '-100' : x < (0.2 * $viewport.width) ? '0' : '-50';
            const placeBelow = threeSongs && index === 1;
            const yOffset = (placeBelow ? 0.1 : 0.25) * $viewport.height;
            const textY = $getYPositionForPercentage(offsetFromThisYPercentage) - yOffset;
            return {
                bubbleX: x, bubbleY: y - radius, textY, 
                elbowX: offsetToThisYear && $getXPositionForYear(offsetToThisYear),
                song, xTranslation, placeBelow, 
                alternateTitle, 
                audioFile
            }
        })
</script>

{#each layoutData as {bubbleX, textY, song, xTranslation, elbowX, alternateTitle, audioFile}}
    <div
        id={song[SONG_DATA_COLUMNS_ENUM.song]}
        class="annotation-wrapper"
        role="tooltip"
        in:fade={{delay: variables.chart['transition-opacity-duration'] / 2, duration: variables.chart['transition-opacity-duration'] / 2 }}
        style={`top: ${textY}px; left: ${elbowX || bubbleX}px; transform: translateX(${xTranslation}%) translateY(-${'100'}%);`}
    >
        <SongInfo song={song} alternateTitle={alternateTitle} audioFile={audioFile} />
    </div>
{/each}

<!-- For each layoutData, use html to draw a line extending from bubbleX/Y up to textY with thickness 3 pixels -->

{#each layoutData as {bubbleX, bubbleY, textY, elbowX}}
    {#if aNonTrivialSize(bubbleY - textY)}
        <div
            class="annotation-line"
            in:fade={{delay: variables.chart['transition-opacity-duration'] / 2, duration: variables.chart['transition-opacity-duration'] / 2 }}
            style={`top: ${textY}px; left: ${bubbleX}px; height: ${bubbleY - textY}px;`}
        />
    {/if}
    {#if elbowX && aNonTrivialSize(bubbleX - elbowX)}
        <div
            class="annotation-line"
            in:fade={{delay: variables.chart['transition-opacity-duration'] / 2, duration: variables.chart['transition-opacity-duration'] / 2 }}
            style={`top: ${textY}px; left: ${elbowX}px; width: ${bubbleX - elbowX}px; height: 2px;`}
        />
    {/if}
{/each}

<style>
    div {
        position: absolute;
        z-index: 10000;
        /* This is mostly so the very long performer names + year don't wrap */
        white-space: nowrap;
    }

    div.annotation-line {
        background-color: black;
        width: 2px;
        margin-left: -0.5px;
    }
</style>