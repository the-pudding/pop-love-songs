<script>
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import data from "$data/20-EXPORT-viz-ready-data.json";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
	import searchAndFilter from "$stores/searchAndFilter.js";

	const genres = [
		...new Set(data.map((song) => song[SONG_DATA_COLUMNS_ENUM.generic_genre]))
	];
	const genreOptions = genres.map((genre) => ({
		label: genre,
		value: genre
	}));

	let userSelectedGenres = [];

	$: {
		searchAndFilter.update((state) => ({
			...state,
			selectedGenres: userSelectedGenres.map(({ value }) => value)
		}));
	}
</script>

<MultiSelect
	placeholder="Select genre(s)"
	bind:selected={userSelectedGenres}
	options={genreOptions}
/>

<style>
</style>
