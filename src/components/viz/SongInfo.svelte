<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { abbreviateYear } from "$data/data-utils";
	import viewport from "$stores/viewport";
	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;
	export let alternateTitle;
	export let audioFile = false;

	
	$: year = abbreviateYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);

</script>

<div class='song-and-year'>
	<strong class='song' style={`font-size: ${$viewport.isMobileLandscapeWidth ? '16px' : '24px'}`}>
		{alternateTitle || song[SONG_DATA_COLUMNS_ENUM.song]}
	</strong>
	<span class='year' style={`font-size: ${$viewport.isMobileLandscapeWidth ? '12px' : '16px'}`}>{year}</span>
	{#if audioFile}
		<SongSnippetPlayer songName={song[SONG_DATA_COLUMNS_ENUM.song]} loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]} audioFile={audioFile} />
	{/if}
</div>
<div class="performer">
	<PerformerNames {song} />
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
		text-shadow: 2px 2px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-2px -2px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			2px -2px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-2px 2px 1px rgba(var(--color-rgba-annotation-text-shadow));
	}

	.year, .performer {
		font-weight: 300;
		text-shadow: 1px 1px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-1px -1px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			1px -1px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-1px 1px 1px rgba(var(--color-rgba-annotation-text-shadow));
	}
</style>
