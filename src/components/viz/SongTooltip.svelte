<script>
	import viewport from "$stores/viewport.js";
	import {
		DATA_COLUMNS_ENUM,
		LOVE_SONG_TYPE_COLOR_MAP
	} from "$data/data-constants.js";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";

	$: song = $hoveredSongInfo.song || [];
	$: x = $hoveredSongInfo.x;
	$: y = $hoveredSongInfo.y;
	$: isVisible = x !== undefined && y !== undefined && song.length > 0;

	$: tooltipXOffset = $viewport.width / 2 > x ? 20 : -310;
	$: tooltipYOffset = $viewport.height / 2 > y ? 30 : -130;
</script>

<div
	id="song-tooltip"
	role="tooltip"
	aria-hidden={!isVisible}
	style:display={isVisible ? "block" : "none"}
	style={`top: ${y + tooltipYOffset}px; left: ${x + tooltipXOffset}px`}
>
	<ul>
		<strong>{song[DATA_COLUMNS_ENUM.song]}</strong>
		<div class="performer">by {song[DATA_COLUMNS_ENUM.performer]}</div>
		<div
			style:color={LOVE_SONG_TYPE_COLOR_MAP[
				song[DATA_COLUMNS_ENUM.love_song_sub_type]
			]}
		>
			{song[DATA_COLUMNS_ENUM.love_song_sub_type]}
		</div>
	</ul>
</div>

<style>
	.performer {
		font-style: italic;
	}

	#song-tooltip {
		z-index: 10000;
		position: absolute;
		width: 280px;
		height: 100px;
		background-color: white;
		border: 1px solid black;
		padding: 0.5rem;
	}
</style>
