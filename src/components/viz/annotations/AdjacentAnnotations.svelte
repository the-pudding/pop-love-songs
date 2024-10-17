<script>

    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import SongInfo from "../SongInfo.svelte";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

    const X_OFFSET = 12;
    const Y_OFFSET = 24;
    const getX = (x, radius, rightAlign, placeBelow, placeAbove) => {  
        if (placeAbove) {
            return x - X_OFFSET * 2; // slide it more centered
        }
        if (placeBelow) {
            return x + X_OFFSET * 2; // slide it more centered
        }
        const direction = rightAlign ? -1 : 1
        return x + direction * (X_OFFSET + radius);
    }
    $: layoutData = $songAnnotationsWithPosition
        .filter(({adjacentAnnotation}) => adjacentAnnotation) 
        .map(({song, x, y, radius, rightAlign, placeBelow, placeAbove, alternateTitle, audioFile}) => {
            const xPos = getX(x, radius, rightAlign, placeBelow, placeAbove);
            const yPos = y - (placeBelow ? -40 : (placeAbove ? 60 : Y_OFFSET));
            return {xPos, yPos, song, rightAlign, alternateTitle, audioFile}
        })
        .sort((a, b) => a.xPos - b.xPos); // sort into from left to right, so tabindex will match visual order
</script>

{#each layoutData as {xPos, yPos, song, rightAlign, alternateTitle, audioFile}}
    <li
        id={song[SONG_DATA_COLUMNS_ENUM.song].replaceAll(' ', '-')}
        class="annotation-wrapper"
        role="tooltip"
        style={`top: ${yPos}px; left: ${xPos}px; ${rightAlign ? 'transform: translateX(-100%);' : ''}`}
    >
        <SongInfo {song} {alternateTitle} {audioFile} {rightAlign} />
    </li>
{/each}



<style>
	.annotation-wrapper {
		z-index: 10000;
		position: absolute;
		max-height: 300px;
		background-color: transparent;

        /* Both attempts to get (mostly just WAP) not to become a tower of wrapped text */
        /* white-space: nowrap; */
        min-width: 100px;

        pointer-events: none;
		user-select: none;
    }

    li {
        list-style-type: none;
    }
</style>