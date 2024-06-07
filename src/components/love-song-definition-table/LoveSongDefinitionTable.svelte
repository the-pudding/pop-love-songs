<script>
	import { LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_CONSTANTS, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { currentStoryStep } from "$stores/storySteps";
    LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP
    // Rendering logic:
    // Only show rows which have 1+ visible types
    // If there is 1+ highlighted types, then “un-highlight” any non-highlighted types
</script>

<table>
    <caption>
        Love Song Types
    </caption>

    <tr>
        <td></td>
        <th scope="col">“You love(d) them, & they...</th>
        <th scope="col"></th>
    </tr>

    <tr>
        <th scope="row">... might love you”</th>
        <td style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]}</td>
        <td class="straddles-cell-below" style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]}</td>
    </tr>
    <tr>
        <th scope="row">... love you back ❤️”</th>
        <td style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.serenade]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.serenade]}</td>
        <td>
                <div style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]}</div>
                <div class="straddles-cell-below" style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]}</div>
        </td>
    </tr>
    <tr>
        <th scope="row">... don't love you (but might have once)”</th>
        <td style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]}</td>
        <td style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]}</td>
    </tr>
</table>

<style>
    table {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background: gray;
        opacity: 0.96;
    }

    th, td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
    }

    .straddles-cell-below {
        /* TODO */
    }
</style>