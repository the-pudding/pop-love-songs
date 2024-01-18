<script>
    import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import songsData from "$data/songs-data.js";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
	import searchAndFilter from "$stores/searchAndFilter.js";

    const loveSongTypes = [
        ...new Set(songsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]))
    ];
    const loveSongTypeOptions = loveSongTypes.map((type) => ({
        label: type,
        value: type
    }));

    let userSelectedLoveSongTypes = [];

    const unsubscribe = searchAndFilter.subscribe(($searchAndFilter) => {
        console.log('SONG TYPE: searchAndFilter changed, updating UI', $searchAndFilter.selectedGenres)
        userSelectedLoveSongTypes = loveSongTypeOptions.filter(option =>
            $searchAndFilter.selectedLoveSongTypes.includes(option.value)
        );
    });

    $: if (userSelectedLoveSongTypes) { // TODO: is this if-clause necessary to check?
        console.log('SONG TYPE: UI changed, updating searchAndFIlter', userSelectedLoveSongTypes)
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
    options={loveSongTypeOptions}
/>

<style>
</style>