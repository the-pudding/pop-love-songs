<script>
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { performerSearchString } from "$stores/searchAndFilter";
	import SearchResultText from "./SearchResultText.svelte";

    export let result;

    $: name = result.name;
    
    $: songCountByLoveSongType = result.songCountByLoveSongType;
    $: totalSongCount = result.totalSongCount;
</script>

<div class="performer-search-result">
        <!-- @michelle: what is the best html tags to use here? like is it better to wrap the name (primary info) in an h2 vs a div? -->
        <div class="top-row">
            <h2>
                <SearchResultText fullText={name} query={$performerSearchString} />
            </h2>
            <p><b>{totalSongCount}</b> songs</p>
        </div>
        <ul>
            {#each Object.entries(songCountByLoveSongType) as [type, count]}
                <li>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[type]}: {count}</li>
            {/each}
        </ul>
</div>

<style>
    .performer-search-result {
        font-family: var(--sans);
        font-size: 12px;
    }

    .top-row {
        display: flex;
        justify-content: space-between;
    }

    .top-row {
        flex: 1;
    }
    .top-row h2 {
        margin: 0;
        font-size: 1.2em;
    }
    .top-row p {
        margin: 0;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        font-size: 0.9em;
    }
</style>