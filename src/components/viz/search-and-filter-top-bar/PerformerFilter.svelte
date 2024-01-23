<script>
    import {onDestroy} from "svelte";
    import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
    import {selectedPerformers} from "$stores/searchAndFilter.js";
    import songsData from "$data/songs-data.js";
    import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants.js";

    const performers = [
        ...new Set(songsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.performer]))
    ];
    const performerOptions = performers.map((performer) => ({
        label: performer,
        value: performer
    }));

    let userSelectedPerformers = [];

    // Subscribe to the selectedPerformers store, update the local variable when it changes
    const unsubscribe = selectedPerformers.subscribe(($selectedPerformers) => {
        userSelectedPerformers = performerOptions.filter(option =>
            $selectedPerformers.includes(option.value)
        );
    });

    // Watch for changes in the userSelectedPerformers and update the store
    $: if (userSelectedPerformers) {
        selectedPerformers.set(userSelectedPerformers.map(({ value }) => value));
    }

    // Cleanup the subscription when the component is destroyed
    onDestroy(unsubscribe);
</script>

<MultiSelect
    placeholder="Select performer(s)"
    bind:selected={userSelectedPerformers}
    options={performerOptions}
/>
