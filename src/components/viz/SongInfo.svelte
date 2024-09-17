<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { formatSongTitleForDisplay, formatYearForDisplay } from "$data/data-utils";
	import { textShadow } from "$utils/styling";
	import viewport from "$stores/viewport";

	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;
	export let alternateTitle = '';
	export let audioFile = false;

	
	$: displaySongName = alternateTitle || formatSongTitleForDisplay(song[SONG_DATA_COLUMNS_ENUM.song]);
	$: year = formatYearForDisplay(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);

</script>

<div class='song-and-year'>
	<strong class='song' style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '16px' : '24px'}; text-shadow: ${textShadow(2, 1)};`}>
		{displaySongName}
	</strong>
	
	{#if audioFile}
		<SongSnippetPlayer songName={song[SONG_DATA_COLUMNS_ENUM.song]} loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]} audioFile={audioFile} />
	{/if}
</div>
<div class="performer" style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '12px' : '16px'}; text-shadow: ${textShadow(1, 0.5)};`}>
	<PerformerNames {song} />  (<span class='year' style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '12px' : '16px'}`}>{year}</span>)
</div>

<style>
	div {
		font-family: var(--sans), sans-serif;
	}

	.song-and-year {
		white-space: nowrap;
	}

	.song {
		font-weight: bold;
		text-transform: uppercase;
	}

	.year, .performer {
		font-weight: 300;
	}
</style>
