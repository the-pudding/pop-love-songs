<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
		LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP,
		LOVE_SONG_TYPE_CONSTANTS

	} from "$data/data-constants.js";
	import { loveSongTypeColorMap } from "$stores/visualEncodings";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;

	$: loveSongSubType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
	$: loveSongColor = $loveSongTypeColorMap[loveSongSubType];
</script>

<div
	style={`background-color: ${loveSongColor}; color: ${
		loveSongSubType === LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak
			? "lightgray"
			: "black"
	}`}
>
	<strong>{song[SONG_DATA_COLUMNS_ENUM.song]}</strong> ({Math.floor(
		song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]
	)})
</div>
<div class="love-song-type" style:color={loveSongColor}>
	<!-- TODO: if in typesTreatedAsNonLoveSongs, mark is as NOT a love song -->
	{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongSubType]}
</div>
<div class="performer">
	<PerformerNames {song} />
</div>

<style>
	.love-song-type {
		font-style: italic;
		font-size: 10px;
	}
</style>
