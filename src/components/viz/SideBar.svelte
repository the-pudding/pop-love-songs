<script>
	import {derived} from "svelte/store";
	import { selectedSongsData } from "$stores/dataDerivations.js";
	import SongInfo from "./SongInfo.svelte";

	import { getArrayOfPerformers } from "$data/data-utils";

	const performerSongCount = derived(
		selectedSongsData,
		($selectedSongsData) => {
			const performers = $selectedSongsData.reduce((performers, {song}) => {
				getArrayOfPerformers(song).forEach(performer => {
					if (performers[performer]) {
						performers[performer]++;
					} else {
						performers[performer] = 1;
					}
				});
				return performers;
			}, {});
			// If Fewer than 20 performers, show all
			const MIN_HITS = Object.keys(performers).length <= 20 ? 1 : 2;
			return Object.entries(performers).filter(([, count]) => count >= MIN_HITS).sort(([, countA], [, countB]) => countB - countA);
		}
	);
</script>


<section style:width={300}>
	<h4>Top 20 artists for selection</h4>
	<ul>
		{#each ($performerSongCount).slice(0, 20) as [performer, count]}
			<li>{performer} ({count})</li>
		{/each}
	</ul>

	<h4>{$selectedSongsData.length} songs selected</h4>
	<ul>
		<!-- TEMP: only render a susbet to improve perf until we use a virtualized list -->
		{#each ($selectedSongsData).slice(0, 100) as s}
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
