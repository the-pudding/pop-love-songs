<script>
	import { ACCESSIBLY_CONTRASTING_COLOR_MAP, LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_CONSTANTS, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { isEndingSandboxStep } from "$stores/storySteps";

    export let loveSongType;

    $: userRejectedType = $isEndingSandboxStep && $typesTreatedAsNonLoveSongs.includes(+loveSongType);
</script>

<span class="love-song-type"
    style:background-color={LOVE_SONG_TYPE_COLOR_MAP[loveSongType]}
    style:color={ACCESSIBLY_CONTRASTING_COLOR_MAP[loveSongType]}
    style:text-decoration={userRejectedType ? 'line-through' : 'none'}
>
    {LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
</span>

{#if userRejectedType}
    <span class="love-song-type"
        style:background-color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]}
        style:color={ACCESSIBLY_CONTRASTING_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]}
    >
        {LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]}
    </span>
{/if}


<style>
    .love-song-type {
        border-radius: 4px;
        padding: 1px 5px 2px;
        font-weight: 600;
        white-space: nowrap;
        font-size: 10px;
        margin-top: 5px;

        box-shadow: 0 1px 2px rgb(84, 84, 84);
    }
</style>