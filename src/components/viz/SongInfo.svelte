<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;
	export let alternateTitle;
	export let audioFile = false;

	const formatYear = (year) => {
		const shortNumber = Math.floor(year % 100)
		return `'${shortNumber > 9 ? shortNumber : '0' + shortNumber}`;
	}
	$: year = formatYear(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);

</script>

<div class='song-and-year'>
	<strong class='song'>{alternateTitle || song[SONG_DATA_COLUMNS_ENUM.song]}</strong>
	<span class='year'>{year}</span>
	{#if audioFile}
		<SongSnippetPlayer audioFile={audioFile} />
	{/if}
</div>
<div class="performer">
	<PerformerNames {song} />
</div>

<style>
	div {
		font-family: 'Atlas Grotesk', sans-serif;
	}

	.song-and-year {
		white-space: nowrap;
	}

	.song {
		font-size: 24px;
		font-weight: bold;
		text-transform: uppercase;
		text-shadow: 2px 2px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-2px -2px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			2px -2px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-2px 2px 1px rgba(var(--color-rgba-annotation-text-shadow));
	}

	.year, .performer {
		font-size: 16px;
		font-weight: 300;
		text-shadow: 1px 1px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-1px -1px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			1px -1px 1px rgba(var(--color-rgba-annotation-text-shadow)),
			-1px 1px 1px rgba(var(--color-rgba-annotation-text-shadow));
	}
</style>
