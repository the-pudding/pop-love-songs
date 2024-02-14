<script>
    import PerformerName from "./PerformerName.svelte";
	import { getArrayOfPerformers } from "$data/data-utils";
    export let song;
    $: performers = getArrayOfPerformers(song);
</script>

{#each performers as performer}
    <PerformerName {performer} />
{/each}