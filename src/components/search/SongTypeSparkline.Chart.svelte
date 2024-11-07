<script>
    import { typesTreatedAsNonLoveSongs } from '$stores/searchAndFilter.js';
    import { loveSongTypeColorMap } from "$stores/colorMap";
    import { loveSongTypeToDisplayTextMap } from '$stores/labels';
    import { LOVE_SONG_TYPE_CONSTANTS } from '$data/data-constants';
    
    export let songCountByLoveSongType;
    export let totalSongCount;

    let tooltipVisible = false;
    let tooltipContent = '';
    let tooltipX = 0;
    let tooltipY = 0;

    const description = (count, loveSongType) => `${count} ${$loveSongTypeToDisplayTextMap[loveSongType]}`;
    $: handleMouseEnter = (loveSongType, count, event) => {
        tooltipContent = description(count, loveSongType);
        tooltipX = event.clientX;
        tooltipY = event.clientY + 4; // Adjust the offset as needed
        tooltipVisible = true;
    };

    $: handleMouseLeave = () => {
        tooltipVisible = false;
    };

    let sortedSongTypes = [];
    $: typesMarkedAsNonLoveSongs = Object.entries(songCountByLoveSongType).reduce(
            (acc, [loveSongType, count]) => {
                if ($typesTreatedAsNonLoveSongs.includes(+loveSongType)) {
                    const existingNonLoveSongCount = acc[LOVE_SONG_TYPE_CONSTANTS.notALoveSong] || 0;
                    acc[LOVE_SONG_TYPE_CONSTANTS.notALoveSong] = existingNonLoveSongCount + count;
                } else {
                    acc[loveSongType] = count;
                }
                return acc;
            },
            {}
        );

    $: sortedSongTypes = Object.entries(typesMarkedAsNonLoveSongs).sort((a, b) => b[1] - a[1]);
</script>

<ul class="stacked-bar-chart">
    {#each sortedSongTypes as [loveSongType, count]}
        <li
            aria-label={description(count, loveSongType)}
            on:mouseenter={(event) => handleMouseEnter(loveSongType, count, event)}
            on:mouseleave={() => handleMouseLeave()}
            class="bar-segment"
            style:width="{(count / totalSongCount) * 100}%" 
            style:background={$loveSongTypeColorMap[loveSongType]}
        />
    {/each}
</ul>

{#if tooltipVisible}
    <div class="tooltip" style="top: {tooltipY}px; left: {tooltipX}px; transform: translateX(-50%);">
        {tooltipContent}
    </div>
{/if}

<style>
    .stacked-bar-chart {
        display: flex;
        width: 100%;
        height: 8px;
        margin: 0;
        padding: 0;
    }

    .bar-segment {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        white-space: nowrap;
    }

    .bar-segment:hover {
        border: 1px solid black;
    }

    .tooltip {
        position: fixed;
        background-color: #333;
        color: #fff;
        padding: 5px;
        border-radius: 3px;
        pointer-events: none;
        white-space: nowrap;
    }
</style>