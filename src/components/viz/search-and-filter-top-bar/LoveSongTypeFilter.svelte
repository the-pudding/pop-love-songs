<script>
	import { onDestroy } from "svelte";
	import { LOVE_SONG_TYPES } from "$data/data-constants";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)

	const loveSongOptions = LOVE_SONG_TYPES.map((type) => ({
		label: type || "(not a love song)",
		value: type
	}));

	let userSelectedLoveSongTypes = [];

	// Subscribe to the searchAndFilter store, update the local variable when it changes
	const unsubscribe = searchAndFilter.subscribe(($searchAndFilter) => {
		// if ($searchAndFilter.selectedLoveSongTypes.length === userSelectedLoveSongTypes.length) return
		// setting userSelectedLoveSongTypes instead of "t" causes an infinite loop... @michelle how do I fix this?
		const t = loveSongOptions.filter(option =>
			$searchAndFilter.selectedLoveSongTypes.includes(option.value)
		);
		console.log(t)
	});

	$: {
		searchAndFilter.update((state) => ({
			...state,
			selectedLoveSongTypes: userSelectedLoveSongTypes.map(({ value }) => value)
		}));
	}
	onDestroy(unsubscribe);
</script>

<MultiSelect
	placeholder="Select love song type(s)"
	bind:selected={userSelectedLoveSongTypes}
	options={loveSongOptions}
/>

<style>
</style>
