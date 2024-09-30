<script>
	import { loveSongTypeColorMap } from "$stores/colorMap";

    export let songCountByLoveSongType;
</script>

<ul>
    {#each Object.entries(songCountByLoveSongType) as [type, count]}
        <li style:background={$loveSongTypeColorMap[type]}>{type}: {count}</li>
    {/each}
</ul>

<style>
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 0;
        margin: 0;
    }
</style>