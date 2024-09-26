<script>
	import viewport from "$stores/viewport.js";
	import { currentStoryStep } from "$stores/storySteps";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
	import { showAggregateSnakeChart } from "$stores/searchAndFilter";
	
	import SongInfo from "./SongInfo.svelte";
	import BubbleOutline from "./BubbleOutline.svelte";
	

	$: song = $hoveredSongInfo.song || [];
	$: x = $hoveredSongInfo.x;
	$: y = $hoveredSongInfo.y;
	$: circleX = $hoveredSongInfo.circleX;
	$: circleY = $hoveredSongInfo.circleY;
	$: circleRadius = $hoveredSongInfo.circleRadius;

	// TODO: probably we'll want to to do something more like place different content if bubble chart is hidden
	$: visible = x !== undefined && y !== undefined && song.length > 0 && !$showAggregateSnakeChart;

	$: xOffset = 12;
	$: yOffset = 12;
	$: tooltipPosition = {
		top: $viewport.height / 2 > y ? `${y + yOffset}px` : 'auto',
		bottom: $viewport.height / 2 > y ? 'auto' : `${$viewport.height - y + yOffset}px`,
		left: $viewport.width / 2 > x ? `${x + xOffset}px` : 'auto',
		right: $viewport.width / 2 > x ? 'auto' : `${$viewport.width - x + xOffset}px`,
	};

	// When a step changes, you don't want to keep showing the tooltip from the previous step.
	currentStoryStep.subscribe(() => {
		if (visible) {
			hoveredSongInfo.set({})
		}
	})
</script>

<!-- @michelle: do you have any strong arguments for why I should use class:visible vs just conditionally rendering? -->
{#if visible}
	<div>
		<div
			class="tooltip"
			role="tooltip"
			style={`top: ${tooltipPosition.top}; bottom: ${tooltipPosition.bottom}; left: ${tooltipPosition.left}; right: ${tooltipPosition.right}; transform: ${tooltipPosition.transform};`}
		>
			<SongInfo {song} />
		</div>

		<BubbleOutline {circleX} {circleY} {circleRadius} />
	</div>
{/if}

<style>
	 .tooltip {
		z-index: 10000;
		position: absolute;
		padding: 0.5rem;
	}
</style>
