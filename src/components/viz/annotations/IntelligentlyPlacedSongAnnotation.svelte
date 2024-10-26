<script>
	import viewport from "$stores/viewport.js";
	import { currentStoryStep } from "$stores/storySteps";
	import { showAggregateSnakeChart, showAnnotations } from "$stores/searchAndFilter";
	import { songAnnotationsWithPosition } from "$stores/visualEncodings";
	
	import SongInfo from "../SongInfo.svelte";
	import BubbleOutline from "../BubbleOutline.svelte";
	import { songInAnnotations } from "$data/data-utils";
	
    export let songInfo = {}
    export let onClear = () => {}

	$: song = songInfo.song || [];
	$: x = songInfo.x;
	$: y = songInfo.y;
	$: circleX = songInfo.circleX;
	$: circleY = songInfo.circleY;
	$: circleRadius = songInfo.circleRadius;

	// TODO: probably we'll want to to do something more like place different content if bubble chart is hidden
	$: visible = x !== undefined && y !== undefined && song.length > 0 && !$showAggregateSnakeChart;

	const xOffset = 12;
	const yOffset = 12;
	$: rightAlign = x > $viewport.width / 2;
	$: tooltipPosition = {
		top: $viewport.height / 2 > y ? `${y + yOffset}px` : 'auto',
		bottom: $viewport.height / 2 > y ? 'auto' : `${$viewport.height - y + yOffset}px`,
		left: rightAlign ? 'auto' : `${x + xOffset}px`,
		right: rightAlign ? `${$viewport.width - x + xOffset}px` : 'auto',
	};

	// When a step changes, you don't want to keep showing the tooltip from the previous step.
	currentStoryStep.subscribe(() => {
		if (visible) {
			onClear()
		}
	})

	songAnnotationsWithPosition

	$: alreadyAnnotated = $showAnnotations && songInAnnotations(song, $currentStoryStep.visualEncodings.songAnnotations)
</script>

<!-- @michelle: do you have any strong arguments for why I should use class:visible vs just conditionally rendering? -->
{#if visible && !alreadyAnnotated}
	<div>
		<div
			class="tooltip"
			role="tooltip"
			style={`top: ${tooltipPosition.top}; bottom: ${tooltipPosition.bottom}; left: ${tooltipPosition.left}; right: ${tooltipPosition.right}; transform: ${tooltipPosition.transform};`}
		>
			<SongInfo {song} {rightAlign} />
		</div>

		<BubbleOutline {circleX} {circleY} {circleRadius} />
	</div>
{/if}

<style>
	 .tooltip {
		position: absolute;
		padding: 0.5rem;
		z-index: 1;

		pointer-events: none;
	}
</style>
