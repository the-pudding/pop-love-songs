<script>
	import { ACCESSIBLY_CONTRASTING_COLOR_MAP, LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { songSearchString } from "$stores/searchAndFilter";
	import LoveSongTypePill from "./LoveSongTypePill.svelte";
	import SearchResultText from "./SearchResultText.svelte";

    export let result;
</script>

<div class="search-result">
    <div class="top-row">
        <span class="song-name">
            <SearchResultText fullText={result.songName} query={$songSearchString} />
        </span>
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
    }
    .song-name {
        font-weight: bold;
    }
    .year {
        color: var(--color-gray-500);
    }
</style>