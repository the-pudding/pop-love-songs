<script>
    import viewport from "$stores/viewport";

    import { annotatedSongsData } from "$stores/dataDerivations";
	import SongInfo from "./SongInfo.svelte";
	import { getXPosForYear } from "$data/data-utils";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

    $: y = $viewport.height / 2; // TEMP: just positioning it in the middle of the screen for now. Eventually we might want x/y passed from the simulation (ie exact position)... or would that introduce a weierd jitter?
    $: yOffset = 40;

    const ANNOTATION_WIDTH = 200;
    $: getXPos = (song) => {
        const xPos = getXPosForYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal], $viewport.width);
        const xOffset =  ANNOTATION_WIDTH > $viewport.width - xPos ? - ANNOTATION_WIDTH : 10;
        return xPos + xOffset
    }
</script>

{#each $annotatedSongsData as {song}}
    <div
        class="annotation-wrapper"
        role="tooltip"
        style={`top: ${y + yOffset}px; left: ${getXPos(song)}px`}
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