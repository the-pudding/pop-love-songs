<script>
	import { LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { songSearchString } from "$stores/searchAndFilter";
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
    <div class="bottom-row">
        <span class="love-song-type" style:color={LOVE_SONG_TYPE_COLOR_MAP[result.loveSongType]}>
            {LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[result.loveSongType]}
        </span>
    </div>
</div>

<style>
    .top-row {
        display: flex;
        justify-content: space-between;
    }
    .song-name {
        font-weight: bold;
    }
    .year {
        color: #888;
    }
    .bottom-row {
        margin-top: 5px;
        color: #555;
    }
</style>