<script>
    import { loveSongTypeColorMap } from "$stores/colorMap";

    export let songCountByLoveSongType;
    export let totalSongCount;
</script>

<ul class="stacked-bar-chart">
    {#each Object.entries(songCountByLoveSongType) as [type, count]}
        {@const description = `${count} songs of type ${type}`}
        <li aria-label={description} title={description} class="bar-segment" style:width="{(count / totalSongCount) * 100}%" style:background={$loveSongTypeColorMap[type]}/>
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