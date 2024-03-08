<script>
    import {onDestroy} from "svelte";
    import MultiSelect from "svelte-multiselect"; // (eventually we'll replace this with our own Select component likely)
    import {selectedPerformers} from "$stores/searchAndFilter.js";
    import {selectedSongsData} from "$stores/dataDerivations.js";
	import { getArrayOfPerformers } from "$data/data-utils";

    const nonUniqueListOfPerformers = $selectedSongsData.reduce((accum, {song}) => ([
        ...accum,
        ...getArrayOfPerformers(song)
    ]), []);

    const performers = [
        ...new Set([...nonUniqueListOfPerformers])
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
