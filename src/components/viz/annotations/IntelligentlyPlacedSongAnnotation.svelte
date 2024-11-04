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
	export let xOffset = 4;
	export let yOffset = 4;
	export let zIndex = 1;

	$: song = songInfo.song || [];
	$: x = songInfo.x;
	$: y = songInfo.y;
	$: circleX = songInfo.circleX;
	$: circleY = songInfo.circleY;
	$: circleRadius = songInfo.circleRadius;

	// TODO: probably we'll want to to do something more like place different content if bubble chart is hidden
	$: visible = x !== undefined && y !== undefined && song.length > 0 && !$showAggregateSnakeChart;

	$: rightAlign = x > $viewport.width / 2;
	$: tooltipPosition = {
		top: $viewport.height / 2 > (y + circleRadius) ? `${y + circleRadius + yOffset}px` : 'auto',
		bottom: $viewport.height / 2 > (y + circleRadius) ? 'auto' : `${$viewport.height - (y + circleRadius) + yOffset}px`,
		left: rightAlign ? 'auto' : `${x + circleRadius + xOffset}px`,
		right: rightAlign ? `${$viewport.width - (x + circleRadius) + xOffset}px` : 'auto',
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
	<div
		class="tooltip"
		role="tooltip"
		style={`
			top: ${tooltipPosition.top}; bottom: ${tooltipPosition.bottom}; left: ${tooltipPosition.left}; right: ${tooltipPosition.right}; 
			transform: ${tooltipPosition.transform};
			z-index: ${zIndex};
		`}
	>
		<SongInfo {song} {rightAlign} />
	</div>

	<BubbleOutline {circleX} {circleY} {circleRadius} />
{/if}

<style>
	 .tooltip {
		position: absolute;
		padding: 0.5rem;
		z-index: 1;

		pointer-events: none;
	}
</style>
