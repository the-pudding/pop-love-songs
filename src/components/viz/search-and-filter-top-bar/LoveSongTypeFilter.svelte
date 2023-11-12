<script>
	import { LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)

	const loveSongTypes = Object.keys(LOVE_SONG_TYPE_COLOR_MAP);
	const loveSongOptions = loveSongTypes.map((type) => ({
		label: type || "(not a love song)",
		value: type
	}));

	let userSelectedLoveSongTypes = [];

	$: {
		searchAndFilter.update((state) => ({
			...state,
			selectedLoveSongTypes: userSelectedLoveSongTypes.map(({ value }) => value)
		}));
	}
</script>

<MultiSelect
	placeholder="Select love song type(s)"
	bind:selected={userSelectedLoveSongTypes}
	options={loveSongOptions}
/>

<style>
</style>
