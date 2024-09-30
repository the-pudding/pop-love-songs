<script>
    import { loveSongTypeColorMap } from "$stores/colorMap";

    export let songCountByLoveSongType;
    export let totalSongCount;
</script>

<div class="stacked-bar-chart">
    {#each Object.entries(songCountByLoveSongType) as [type, count]}
        {@const description = `${count} songs of type ${type}`}
        <div aria-label={description} title={description} class="bar-segment" style:width="{(count / totalSongCount) * 100}%" style:background={$loveSongTypeColorMap[type]}/>
    {/each}
</div>

<style>
    .stacked-bar-chart {
        display: flex;
        width: 100%;
        height: 30px; /* Adjust the height as needed */
    }

    .bar-segment {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white; /* Adjust text color for better readability */
        font-size: 0.8em; /* Adjust font size as needed */
        overflow: hidden;
        white-space: nowrap;
    }
</style>