<script>
	import hoveredSongInfo from "$stores/hoveredSongInfo";
    import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	import BubbleOutline from "../BubbleOutline.svelte";
    const HOVER_EXTRA_RADIUS = 2;
</script>

{#each $songAnnotationsWithPosition as {x, y, radius}}
    {@const isHovered = x === $hoveredSongInfo.circleX && y === $hoveredSongInfo.circleY}
    <BubbleOutline circleX={x} circleY={y} circleRadius={radius + (isHovered ? HOVER_EXTRA_RADIUS : 0)} />
{/each}