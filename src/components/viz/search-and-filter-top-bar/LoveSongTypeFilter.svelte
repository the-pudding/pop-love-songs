<script>
    import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)

	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants.js";
	import {selectedLoveSongTypes} from "$stores/searchAndFilter.js";

    const loveSongTypeOptions = Object.keys(LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP).map((loveSongTypeInt) => ({
        label: LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongTypeInt],
        value: +loveSongTypeInt
    }));

    let userSelectedLoveSongTypes = [];

    const unsubscribe = selectedLoveSongTypes.subscribe(($selectedLoveSongTypes) => {
        userSelectedLoveSongTypes = loveSongTypeOptions.filter(option =>
            $selectedLoveSongTypes.includes(option.value)
        );
    });

    $: selectedLoveSongTypes.set(userSelectedLoveSongTypes.map(({ value }) => +value))

    onDestroy(unsubscribe);
</script>

<MultiSelect
    placeholder="Select love song type(s)"
    bind:selected={userSelectedLoveSongTypes}
    options={loveSongTypeOptions}
/>