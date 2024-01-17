<script>
    import { onDestroy } from "svelte";
    import searchAndFilter from "$stores/searchAndFilter.js";

    let songSearchString = "";

    const unsubscribe = searchAndFilter.subscribe(($searchAndFilter) => {
        songSearchString = $searchAndFilter.songSearchString;
    });

    $: if (songSearchString) {
        searchAndFilter.update((state) => ({
            ...state,
            songSearchString: songSearchString
        }));
    }

    onDestroy(unsubscribe);
</script>

<div>
    <label for="input--song-search">Songs:</label>
    <input
        id="input--song-search"
        type="search"
        placeholder="Search songs"
        bind:value={songSearchString}
    />
</div>