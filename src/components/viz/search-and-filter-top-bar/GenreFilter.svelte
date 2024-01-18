<script>
	import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import {selectedGenres} from "$stores/searchAndFilter.js";
	import songsData from "$data/songs-data.js";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";

	const genres = [
		...new Set(songsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.generic_genre]))
	];
	const genreOptions = genres.map((genre) => ({
		label: genre,
		value: genre
	}));

	let userSelectedGenres = [];

	// Subscribe to the selectedGenres store, update the local variable when it changes
	const unsubscribe = selectedGenres.subscribe(($selectedGenres) => {
		userSelectedGenres = genreOptions.filter(option =>
			$selectedGenres.includes(option.value)
		);
	});

	// Watch for changes in the userSelectedGenres and update the store
	$: if (userSelectedGenres) {
		selectedGenres.set(userSelectedGenres.map(({ value }) => value));
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<MultiSelect
	placeholder="Select genre(s)"
	bind:selected={userSelectedGenres}
	options={genreOptions}
/>
