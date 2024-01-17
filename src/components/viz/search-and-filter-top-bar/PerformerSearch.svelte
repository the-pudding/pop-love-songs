<script>
    import { onDestroy } from "svelte";
    import searchAndFilter from "$stores/searchAndFilter.js";

    let performerSearchString = "";

    const unsubscribe = searchAndFilter.subscribe(($searchAndFilter) => {
        performerSearchString = $searchAndFilter.performerSearchString;
    });

    $: searchAndFilter.update((state) => ({
            ...state,
            performerSearchString: performerSearchString
        }));

    onDestroy(unsubscribe);
</script>

<div>
    <label for="input--performer-search">Performers:</label>
    <input
        id="input--performer-searc"
        type="search"
        placeholder="Search peferformers"
        bind:value={performerSearchString}
    />
</div>