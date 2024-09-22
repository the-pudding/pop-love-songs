<script>

    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import SongInfo from "./SongInfo.svelte";
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
        .filter(({adjacentAnnotation}) => adjacentAnnotation) 
        .map(({song, x, y, rightAlign, placeBelow, placeAbove, alternateTitle, audioFile}) => {
            const xPos = getX(x, rightAlign, placeBelow, placeAbove);
            const yPos = y - (placeBelow ? -40 : (placeAbove ? 60 : Y_OFFSET));
            return {xPos, yPos, song, rightAlign, alternateTitle, audioFile}
        })
</script>

{#each layoutData as {xPos, yPos, song, rightAlign, alternateTitle, audioFile}}
    <div
        id={song[SONG_DATA_COLUMNS_ENUM.song]}
        class="annotation-wrapper fade-in-image"
        role="tooltip"
        style={`top: ${yPos}px; left: ${xPos}px; ${rightAlign ? 'transform: translateX(-100%);' : ''}`}
    >
        <SongInfo {song} {alternateTitle} {audioFile} />
    </div>
{/each}



<style>
	div.annotation-wrapper {
		z-index: 10000;
		position: absolute;
		max-height: 300px;
		background-color: transparent;

        /* Both attempts to get (mostly just WAP) not to become a tower of wrapped text */
        /* white-space: nowrap; */
        min-width: 100px;
    }

    .fade-in-image {
        animation: fadeIn calc(var(--chart-transition-opacity-duration) * 1ms);
    }

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>