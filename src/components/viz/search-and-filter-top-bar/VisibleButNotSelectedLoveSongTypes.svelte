<script>
    import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import songsData from "$data/songs-data.js";
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants.js";
	import {visibleButNotSelectedLoveSongTypes} from "$stores/searchAndFilter.js";

    const loveSongTypeOptions = Object.keys(LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP).map((loveSongTypeInt) => ({
        label: LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongTypeInt],
        value: loveSongTypeInt
    }));

    let userSelectedLoveSongTypes = [];

    const unsubscribe = visibleButNotSelectedLoveSongTypes.subscribe(($visibleButNotSelectedLoveSongTypes) => {
        userSelectedLoveSongTypes = loveSongTypeOptions.filter(option =>
            $visibleButNotSelectedLoveSongTypes.includes(option.value)
        );
    });

    $: visibleButNotSelectedLoveSongTypes.set(userSelectedLoveSongTypes.map(({ value }) => +value))

    onDestroy(unsubscribe);
</script>

<MultiSelect
    placeholder="Visible but not selected:"
    bind:selected={userSelectedLoveSongTypes}
    options={loveSongTypeOptions}
/>