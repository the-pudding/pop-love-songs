<script>
	import { ACCESSIBLY_CONTRASTING_COLOR_MAP, LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";

    export let loveSongType;
</script>

<span class="love-song-type" style:background-color={LOVE_SONG_TYPE_COLOR_MAP[loveSongType]} style:color={ACCESSIBLY_CONTRASTING_COLOR_MAP[loveSongType]}>
    {LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
</span>


<style>
    .love-song-type {
        border-radius: 4px;
        padding: 1px 5px 2px;
        font-weight: 600;
        white-space: nowrap;
        font-size: 10px;
        margin-top: 5px;
    }
</style>