<script>
    import { previewedPerformersWithMetadata } from "$stores/visualEncodings";
	import BubbleOutline from "../BubbleOutline.svelte";
</script>

{#each $previewedPerformersWithMetadata as { circleX, circleY, circleRadius }}
    <BubbleOutline {circleX} {circleY} {circleRadius} thin={true} />
{/each}