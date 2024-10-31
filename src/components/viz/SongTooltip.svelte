<script>
	import { SONG_DATA_COLUMNS_ENUM } from '$data/data-constants';
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
	import { selectedSong } from '$stores/searchAndFilter';
	import IntelligentlyPlacedSongAnnotation from "./annotations/IntelligentlyPlacedSongAnnotation.svelte";
	
	$: onClear = () => hoveredSongInfo.set({});

	$: alreadySelected = $selectedSong.song && $hoveredSongInfo.song && $selectedSong?.song[SONG_DATA_COLUMNS_ENUM.song] === $hoveredSongInfo.song[SONG_DATA_COLUMNS_ENUM.song];
</script>

{#if !alreadySelected}
	<IntelligentlyPlacedSongAnnotation songInfo={$hoveredSongInfo} {onClear} xOffset={4} yOffset={4} />
{/if}