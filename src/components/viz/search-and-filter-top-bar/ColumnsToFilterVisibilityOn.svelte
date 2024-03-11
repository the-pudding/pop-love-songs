<script>
    import {onDestroy} from "svelte";
	import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";
	import {columnsToFilterVisibilityOn} from "$stores/searchAndFilter.js";

    const loveSongTypeOptions = Object.keys(SONG_DATA_COLUMNS_ENUM).map((type) => ({
        label: type,
        value: SONG_DATA_COLUMNS_ENUM[type]
    }));

    let userSelectedColumnsToFilterVisibilityOn = [];

    const unsubscribe = columnsToFilterVisibilityOn.subscribe(($columnsToFilterVisibilityOn) => {
        userSelectedColumnsToFilterVisibilityOn = loveSongTypeOptions.filter(option =>
            $columnsToFilterVisibilityOn.includes(option.value)
        );
    });

    $: columnsToFilterVisibilityOn.set(userSelectedColumnsToFilterVisibilityOn.map(({ value }) => value))

    onDestroy(unsubscribe);
</script>

<MultiSelect
    placeholder="Base visibility on:"
    bind:selected={userSelectedColumnsToFilterVisibilityOn}
    options={loveSongTypeOptions}
/>