<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { loveSongTypeColorMap } from "$stores/visualEncodings";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;

	$: loveSongSubType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];

	// Format the year from, eg "1966.67" to "'66"
	$: rawYear = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
	$: year = rawYear < 2000 ? `'${Math.floor(rawYear % 100)}` : Math.floor(rawYear);

</script>

<div class='song'>
	<strong>{song[SONG_DATA_COLUMNS_ENUM.song]}</strong>
	<span class='year'>{year}</span>
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

	span.year {
		font-size: 16px;
		font-weight: normal;
	}
</style>
