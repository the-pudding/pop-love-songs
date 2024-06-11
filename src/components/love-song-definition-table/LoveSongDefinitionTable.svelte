<script>
	import viewport from "$stores/viewport";
    import { LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_CONSTANTS, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { currentStoryStep } from "$stores/storySteps";
	import { STORY_STEP_CONTROLLER_BOTTOM_PADDING } from "../viz/viz-utils";
    
    $: rowIsVisible = (loveSongTypesInRow) => {
        return loveSongTypesInRow.some(loveSongType => !$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs.some(t => t === loveSongType));
    }

    const SECOND_COLUMN_TYPES = [LOVE_SONG_TYPE_CONSTANTS.sexualConquest, LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf, LOVE_SONG_TYPE_CONSTANTS.itsComplicated, LOVE_SONG_TYPE_CONSTANTS.goodRiddance];
    $: secondColumnIsVisible = () => {
        // If any of the types in the second column are not treated as non-love songs, then the second column should NOT be visible
        return SECOND_COLUMN_TYPES.some(loveSongType => !$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs.some(t => t === loveSongType));
    }

    $: typeOpacity = (loveSongType) => {
        const isTheHighlightedType = $currentStoryStep.showLoveSongTypeTableWithThisHighlighted === loveSongType;
        if (isTheHighlightedType) return 1;


        return (
            $currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs.length >= 1 
                && !$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs.includes(loveSongType)
            )
              ? 0.4 
              : 0;
    }
</script>

<table style:height={`${$viewport.height - STORY_STEP_CONTROLLER_BOTTOM_PADDING}px`}>
    <caption>
        Love Song Types
    </caption>

    <tr>
        <td></td>
        <th scope="col">“You love(d) them, & they...</th>
        {#if secondColumnIsVisible()}
            <th scope="col"></th>
        {/if}
        
    </tr>

    {#if rowIsVisible([LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation, LOVE_SONG_TYPE_CONSTANTS.sexualConquest])}
        <tr>
            <th scope="row">... might love you”</th>
            <td style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]}</td>
        </tr>
    {/if}
    {#if rowIsVisible([LOVE_SONG_TYPE_CONSTANTS.serenade, LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf, LOVE_SONG_TYPE_CONSTANTS.itsComplicated])}
        <tr>
            <th scope="row">... love you back ❤️”</th>
            <td style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.serenade)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.serenade]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.serenade]}</td>
            {#if secondColumnIsVisible()}
                <td>
                    <div style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.sexualConquest)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]} class="straddles-cell-above">{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]}</div>
                    <div style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]}</div>
                </td>
            {/if}
        </tr>
    {/if}
    {#if rowIsVisible([LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak, LOVE_SONG_TYPE_CONSTANTS.goodRiddance])}
        <tr>
            <th scope="row">... don't love you (but might have once)”</th>
            <td style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]}</td>
            {#if secondColumnIsVisible()} 
                <td>
                    <div class="straddles-cell-above" style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.itsComplicated)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]}</div>
                    <div style:opacity={typeOpacity(LOVE_SONG_TYPE_CONSTANTS.goodRiddance)} style:color={LOVE_SONG_TYPE_COLOR_MAP[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]}</div>
                </td>
            {/if}
        </tr>
    {/if}
</table>

<style>
    table {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
        opacity: 0.96;

        font-family: 'Atlas Grotesk', sans-serif;
    }

    th, td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
    }

    tr {
        position: relative
    }

    .straddles-cell-above {
        position: relative;
        margin-top: -20px;
    }
</style>