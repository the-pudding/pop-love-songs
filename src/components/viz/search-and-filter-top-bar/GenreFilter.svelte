<script>
	import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import songsData from "$data/songs-data.js";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
	import searchAndFilter from "$stores/searchAndFilter.js";

	const genres = [
		...new Set(songsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.generic_genre]))
	];
	const genreOptions = genres.map((genre) => ({
		label: genre,
		value: genre
	}));

	let userSelectedGenres = [];

	// Subscribe to the searchAndFilter store, update the local variable when it changes
	const unsubscribe = searchAndFilter.subscribe(($searchAndFilter) => {
		console.log('GENRE: searchAndFilter changed, updating UI', $searchAndFilter.selectedGenres)
		userSelectedGenres = genreOptions.filter(option =>
			$searchAndFilter.selectedGenres.includes(option.value)
		);
	});

	// Watch for changes in the userSelectedGenres and update the store
	$: if (userSelectedGenres) {
		console.log('GENRE: UI changed, updating searchAndFilter', userSelectedGenres)
		searchAndFilter.update((state) => ({
			...state,
			selectedGenres: userSelectedGenres.map(({ value }) => value)
		}));
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<MultiSelect
	placeholder="Select genre(s)"
	bind:selected={userSelectedGenres}
	options={genreOptions}
/>

<style>
</style>