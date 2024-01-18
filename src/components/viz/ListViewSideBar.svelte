<script>
	import {derived} from "svelte/store";
	import songsData from "$data/songs-data.js";
	import { songIsSelected } from "$stores/dataProperties";
	import SongInfo from "./SongInfo.svelte";
	import { RIGHT_TOOLBAR_WIDTH } from "./viz-utils";

	const selectedSongs = derived(
		songIsSelected,
		($songIsSelected) => songsData.filter((song, index) =>
			$songIsSelected[index]
		)
	);
</script>

<section style:width={`${RIGHT_TOOLBAR_WIDTH}px`}>
	<h4>{$selectedSongs.length} selected</h4>

	<ul>
		<!-- TEMP: only render a susbet to improve perf until we use a virtualized list -->
		{#each ($selectedSongs).slice(0, 100) as s}
			<div>
				<SongInfo song={s.song} />
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
