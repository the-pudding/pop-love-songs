<script>
	import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import {selectedGenders} from "$stores/searchAndFilter.js";
	import { GENDER_ABBREVIATIONS } from "$data/data-constants.js";

	const genders = Object.keys(GENDER_ABBREVIATIONS)
	const genderOptions = genders.map((gender) => ({
		label: GENDER_ABBREVIATIONS[gender],
		value: gender
	}));

	let userSelectedGenders = [];

	// Subscribe to the selectedGenders store, update the local variable when it changes
	const unsubscribe = selectedGenders.subscribe(($selectedGenders) => {
		userSelectedGenders = genderOptions.filter(option =>
			$selectedGenders.includes(option.value)
		);
	});

	// Watch for changes in the userSelectedGenders and update the store
	$: if (userSelectedGenders) {
		selectedGenders.set(userSelectedGenders.map(({ value }) => value));
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<MultiSelect
	placeholder="Select gender(s)"
	bind:selected={userSelectedGenders}
	options={genderOptions}
/>
