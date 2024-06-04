<script>
    import viewport from "$stores/viewport";

    import { annotatedSongsData } from "$stores/dataDerivations";
	import SongInfo from "./SongInfo.svelte";
	import { getXPosForYear } from "$data/data-utils";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

    $: y = $viewport.height / 2; // TEMP: just positioning it in the middle of the screen for now. Eventually we might want x/y passed from the simulation (ie exact position)... or would that introduce a weierd jitter?
    $: xOffset = 10;
    $: yOffset = 40;
</script>

{#each $annotatedSongsData as {song}}
    <div
        class="annotation-wrapper"
        role="tooltip"
        style={`top: ${y + yOffset}px; left: ${getXPosForYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal], $viewport.width) + xOffset}px`}
    >
        <SongInfo song={song} />
    </div>
    
{/each}



<style>
	div.annotation-wrapper {
		z-index: 10000;
		position: absolute;
		width: 280px;
		height: 100px;
		background-color: white;
		border: 1px solid black;
		padding: 0.5rem;
	}
</style>