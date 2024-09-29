<script>
	import { songSearchString } from "$stores/searchAndFilter";
	import LoveSongTypePill from "./LoveSongTypePill.svelte";
	import SearchResultText from "./SearchResultText.svelte";

    export let result;
</script>

<div class="search-result">
    <div class="top-row">
        <h2 class="song-name">
            <SearchResultText fullText={result.songName} query={$songSearchString} />
        </h2>
        <span class="year">{result.year}</span>
    </div>
    <LoveSongTypePill loveSongType={result.loveSongType} />
</div>

<style>
    .search-result {
        font-family: var(--sans);
        font-size: 12px;
    }

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }

    .song-name {
        font-size: 16px;
        margin: 0;
    }

    .year {
        color: var(--color-gray-500);
    }
</style>