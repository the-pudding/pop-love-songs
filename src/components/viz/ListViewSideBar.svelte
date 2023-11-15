<script>
	import songsData from "$data/16-EXPORT-viz-ready-data.json";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import { songIsSelected, X_RIGHT_MARGIN } from "./viz-utils";

	// Filter to a list of all songs, after applying all the filters from searchAndFilter
	$: selectedSongs = songsData.filter((song) =>
		songIsSelected(song, $searchAndFilter)
	);
</script>

<section style:width={`${X_RIGHT_MARGIN}px`}>
	<h2>Selected Songs</h2>

	<ul>
		{#each selectedSongs as song}
			<li>{song[SONG_DATA_COLUMNS_ENUM.song]}</li>
		{/each}
	</ul>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		background-color: blanchedalmond;
		position: absolute;
		top: 50px;
		right: 0;
		height: calc(100% - 50px); /* subtract the top offset */
	}

	ul {
		flex: 1; /* takes the remaining space in the flex container */
		overflow-y: scroll;
	}
</style>
