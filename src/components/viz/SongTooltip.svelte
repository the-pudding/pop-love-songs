<script>
	import { DATA_COLUMNS_ENUM } from "$data/data-constants.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	let x;
	let y;
	let song;

	$: {
		const position = $searchAndFilter.selectedSongInfo.position || {};
		x = position.x;
		y = position.y;

		song = $searchAndFilter.selectedSongInfo.song || [];
	}

	const isVisible = true;
</script>

<div
	id="song-tooltip"
	role="tooltip"
	aria-hidden={!isVisible}
	style:display={isVisible ? "block" : "none"}
	style={`top: ${y}px; left: ${x}px`}
>
	<ul>
		<li>{song[DATA_COLUMNS_ENUM.song]}</li>
		<li>by {song[DATA_COLUMNS_ENUM.performer]}</li>
		<li>type: {song[DATA_COLUMNS_ENUM.love_song_sub_type]}</li>
	</ul>
</div>

<style>
	#song-tooltip {
		z-index: 10000;
		position: absolute;
		background-color: white;
		border: 1px solid black;
		padding: 0.5rem;
	}
</style>
