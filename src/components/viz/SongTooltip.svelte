<script>
	import viewport from "$stores/viewport.js";
	import { currentStoryStep } from "$stores/storySteps";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
	import { showAggregateSnakeChart } from "$stores/searchAndFilter";
	
	import SongInfo from "./SongInfo.svelte";
	import { BUBBLE_BORDER_THICKNESS } from './viz-utils';
	

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

<div>
	<div
		class="tooltip"
		role="tooltip"
		aria-hidden={!visible}
		class:visible
		style={`top: ${tooltipPosition.top}; bottom: ${tooltipPosition.bottom}; left: ${tooltipPosition.left}; right: ${tooltipPosition.right}; transform: ${tooltipPosition.transform};`}
	>
		<SongInfo {song} />
	</div>

	<div
		class="circle-outline"
		aria-hidden={!visible}
		class:visible
		style={`top: ${circleY}px; left: ${circleX}px; height: ${circleRadius * 2}px; width: ${circleRadius * 2}px; border: ${BUBBLE_BORDER_THICKNESS}px solid black;`}
	/>
</div>

<style>
	 .tooltip {
		z-index: 10000;
		position: absolute;
		padding: 0.5rem;

		/* note: dynamically toggled via JS */
		display: none;
	}
	.visible {
		display: block;
	}

	.circle-outline {
		z-index: 10000;
		position: absolute;
		border-radius: 100%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
</style>
