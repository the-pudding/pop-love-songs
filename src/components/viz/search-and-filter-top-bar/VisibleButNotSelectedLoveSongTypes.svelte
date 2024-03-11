<script>
    import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import songsData from "$data/songs-data.js";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
	import {visibleButNotSelectedLoveSongTypes} from "$stores/searchAndFilter.js";

    const loveSongTypes = [
        ...new Set(songsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]))
    ];
    const loveSongTypeOptions = loveSongTypes.map((type) => ({
        label: type || '(Not a love song)',
        value: type
    }));

    let userSelectedLoveSongTypes = [];

    const unsubscribe = visibleButNotSelectedLoveSongTypes.subscribe(($visibleButNotSelectedLoveSongTypes) => {
        userSelectedLoveSongTypes = loveSongTypeOptions.filter(option =>
            $visibleButNotSelectedLoveSongTypes.includes(option.value)
        );
    });

    $: visibleButNotSelectedLoveSongTypes.set(userSelectedLoveSongTypes.map(({ value }) => value))

    onDestroy(unsubscribe);
</script>

<MultiSelect
    placeholder="Select love song type(s)"
    bind:selected={userSelectedLoveSongTypes}
    options={loveSongTypeOptions}
/>