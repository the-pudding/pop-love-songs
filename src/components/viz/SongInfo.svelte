<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { loveSongTypeColorMap } from "$stores/visualEncodings";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;

	$: loveSongSubType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
</script>

<div class='song'>
	<strong>{song[SONG_DATA_COLUMNS_ENUM.song]}</strong> ({Math.floor(
		song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]
	)})
</div>
<div class="performer">
	<PerformerNames {song} />
</div>

<style>
	div {
		font-family: 'Atlas Grotesk', sans-serif;
	}

	div.song {
		font-size: 24px;
	}

	div.performer {
		font-size: 16px;
	}
</style>
