<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
		LOVE_SONG_TYPE_COLOR_MAP
	} from "$data/data-constants.js";
	export let song;
</script>

<div>
	<strong>{song[SONG_DATA_COLUMNS_ENUM.song]}</strong> ({Math.round(
		song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]
	)})
</div>
<div class="performer">by {song[SONG_DATA_COLUMNS_ENUM.performer]}</div>
<div
	style:color={LOVE_SONG_TYPE_COLOR_MAP[
		song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]
	]}
>
	{song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]}
</div>
