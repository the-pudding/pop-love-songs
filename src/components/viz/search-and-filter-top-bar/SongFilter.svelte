<script>
	import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import { selectedSongs, showAggregateSnakeChart } from "$stores/searchAndFilter.js";
	import songsData from "$data/songs-data.js";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";

	const songs = [
		...new Set(songsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.song]))
	];
	const songOptions = songs.map((song) => ({
		label: song,
		value: song
	}));

	let userSelectedSongs = [];

	// Subscribe to the selectedSongs store, update the local variable when it changes
	const unsubscribe = selectedSongs.subscribe(($selectedSongs) => {
		userSelectedSongs = songOptions.filter(option =>
			$selectedSongs.includes(option.value)
		);
	});

	// Watch for changes in the userSelectedPerformers and update the global store, etc
	$: {
		selectedSongs.set(userSelectedSongs.map(({ value }) => value));

		const thereIsAFilter = userSelectedSongs.length > 0
		if ($showAggregateSnakeChart && thereIsAFilter) {
			showAggregateSnakeChart.set(false);
		}
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<MultiSelect
	placeholder="Select song(s)"
	bind:selected={userSelectedSongs}
	options={songOptions}
/>
