<script>
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import BubbleOutline from "../BubbleOutline.svelte";
</script>

{#each $songAnnotationsWithPosition as {x, y, radius}}
    <BubbleOutline circleX={x} circleY={y} circleRadius={radius} />
{/each}