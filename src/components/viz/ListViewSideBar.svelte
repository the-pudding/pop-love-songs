<script>
	import songsData from "$data/16-EXPORT-viz-ready-data.json";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import SongInfo from "./SongInfo.svelte";
	import { songIsSelected, X_RIGHT_MARGIN } from "./viz-utils";

	// Filter to a list of all songs, after applying all the filters from searchAndFilter
	$: selectedSongs = songsData.filter((song) =>
		songIsSelected(song, $searchAndFilter)
	);
</script>

<section style:width={`${X_RIGHT_MARGIN}px`}>
	<h4>{selectedSongs.length} selected</h4>

	<ul>
		<!-- TEMP: only render a susbet to improve perf until we use a virtualized list -->
		{#each selectedSongs.slice(0, 100) as song}
			<div>
				<SongInfo {song} />
			</div>
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

	ul > div {
		margin-bottom: 16px;
	}
</style>
