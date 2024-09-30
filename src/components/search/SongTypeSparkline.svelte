<script>
	import { typesTreatedAsNonLoveSongs } from '$stores/searchAndFilter.js';
    import { loveSongTypeColorMap } from "$stores/colorMap";
    import { loveSongTypeToDisplayTextMap } from '$stores/labels';
	import { LOVE_SONG_TYPE_CONSTANTS } from '$data/data-constants';
	

    export let songCountByLoveSongType;
    export let totalSongCount;

    let sortedSongTypes = [];
    $: processTypesMarkedAsNonLoveSongs = Object.entries(songCountByLoveSongType).reduce(
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

    $: sortedSongTypes = Object.entries(processTypesMarkedAsNonLoveSongs).sort((a, b) => b[1] - a[1]);
</script>

<ul class="stacked-bar-chart">
    {#each sortedSongTypes as [loveSongType, count]}
        {@const description = `${count} ${$loveSongTypeToDisplayTextMap[loveSongType]} songs`}
        <li aria-label={description} title={description} class="bar-segment" style:width="{(count / totalSongCount) * 100}%" style:background={$loveSongTypeColorMap[loveSongType]}/>
    {/each}
</ul>

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
</style>