<script>
	import { getArrayOfPerformers } from "$data/data-utils";
    export let song;
    $: performers = getArrayOfPerformers(song);
</script>

{#each performers as performer, index}
    <span aria-label={performer}>
        {performer}{index < performers.length - 1 ? ", " : ""}
    </span>
{/each}