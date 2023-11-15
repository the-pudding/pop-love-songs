<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
		LOVE_SONG_TYPE_COLOR_MAP
	} from "$data/data-constants.js";
	export let song;

	$: loveSongSubType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
	$: loveSongColor = LOVE_SONG_TYPE_COLOR_MAP[loveSongSubType];
</script>

<div
	style={`background-color: ${loveSongColor}; color: ${
		loveSongColor === LOVE_SONG_TYPE_COLOR_MAP["Heartbreak & Longing"]
			? "white"
			: "black"
	}`}
>
	<strong>{song[SONG_DATA_COLUMNS_ENUM.song]}</strong> ({Math.round(
		song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]
	)})
</div>
<div class="performer">by {song[SONG_DATA_COLUMNS_ENUM.performer]}</div>
<div class="love-song-type" style:color={loveSongColor}>
	{loveSongSubType}
</div>

<style>
	.love-song-type {
		font-style: italic;
		font-size: 10px;
	}
</style>
