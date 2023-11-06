<script>
	import { LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import MultiSelect from 'svelte-multiselect' // (eventually we'll replace this with our own Select component likely)

	const loveSongTypes = Object.keys(LOVE_SONG_TYPE_COLOR_MAP);
	const loveSongOptions = loveSongTypes.map((type) => ({
		label: type || "(not a love song)",
		value: type
	}));

	let userSelectedLoveSongTypes = [];

	$: {
		console.log(userSelectedLoveSongTypes);
		searchAndFilter.update((state) => ({
			...state,
			selectedLoveSongTypes: userSelectedLoveSongTypes.map(({value}) => value)
		}));	
	}
</script>

<div>
	<MultiSelect bind:selected={userSelectedLoveSongTypes} options={loveSongOptions} />
</div>

<style>
	div {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 1.25em;
		height: 50px;
		/* background: var(--color-fg);
		color: var(--color-bg);
		font-family: monospace;
		font-size: 16px; */
	}
</style>
