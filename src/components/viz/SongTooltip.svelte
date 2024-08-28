<script>
	import viewport from "$stores/viewport.js";
	import { currentStoryStep } from "$stores/storySteps";

	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
	import SongInfo from "./SongInfo.svelte";
	import { showAggregateSnakeChart } from "$stores/searchAndFilter";
	

	$: song = $hoveredSongInfo.song || [];
	$: x = $hoveredSongInfo.x;
	$: y = $hoveredSongInfo.y;
	// TODO: probably we'll want to to do something more like place different content if bubble chart is hidden
	$: visible = x !== undefined && y !== undefined && song.length > 0 && !$showAggregateSnakeChart;

	$: xOffset = $viewport.width / 2 > x ? 20 : -310;
	$: yOffset = $viewport.height / 2 > y ? 30 : -130;

	// When a step changes, you don't want to keep showing the tooltip from the previous step.
	currentStoryStep.subscribe(() => {
		if (visible) {
			hoveredSongInfo.set({})
		}
	})
</script>

<div
	role="tooltip"
	aria-hidden={!visible}
	class:visible
	style={`top: ${y + yOffset}px; left: ${x + xOffset}px`}
>
	<SongInfo {song} />
</div>

<style>
	div {
		z-index: 10000;
		position: absolute;
		max-width: 400px; /* TODO: make smaller for mobile? */
		background-color: rgba(253, 253, 253, 0.8);
		padding: 0.5rem;

		/* note: dynamically toggled via JS */
		display: none;
	}
	.visible {
		display: block;
	}
</style>
