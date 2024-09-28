<script>
	import { onMount } from "svelte";
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { forceSimulation, forceX, forceY, forceCollide } from "d3";

	import XAxis from "./XAxis.svelte";
	import LoveSongTypeLabels from "./LoveSongTypeLabels.svelte";

	import viewport from "$stores/viewport.js";
	import { songIsSelected, songIsVisible } from "$stores/dataDerivations";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";

	import songsData from "$data/songs-data.js";
	import variables from '$data/variables.json';
	import {
		BUBBLE_BORDER_THICKNESS,
		getInvisibleFillFromSongIndex,
		getSnakeFill,
		getSongIndexFromClickLocation
	} from "./viz-utils";

	import { simulationStore } from "$stores/simulation";
	import { DEFAULT_Y_ENTRANCE_POSITION } from "$stores/forcePositionOptions-helper";
	import { songRadius, xForcePosition, yForcePosition } from "$stores/visualEncodings";
	import { loveSongTypeColorMap, rgbaArrayToString, songColor, unselectedLoveSongTypeColorMap } from "$stores/colorMap";
	import { svgPathGenerator, svgCoordsForLoveSongTypes } from "$stores/aggregateSnakeChartPositions";
	import { svgCoordsForSnakeChartOutline } from "$stores/snakeChartOutlineGenerator";
	import { currentStoryStep, preventBubbleRestartBecauseTheUserIsMerelySearching } from "$stores/storySteps";
	import { showAggregateSnakeChart } from "$stores/searchAndFilter";
	import { songInAnnotations } from "$data/data-utils";
	import LoveSongChangeAnnotation from "./LoveSongChangeAnnotation.svelte";
	
	// Initiate mutable simulation, give bubbles an initial position
	const forceSimulationData = songsData.map((songObject, songIndex) => ({
		...songObject,
		
		x: $xForcePosition[songIndex],
		y: $yForcePosition[songIndex]
	}));

	let canvas;
	let context;
	let invisibleCanvas;
	let invisibleContext;

	let simulation;

	const updateVisibleAndInvisibleCanvases = () => {
		if (!context || !canvas) return;

		// clear the canvas
		invisibleContext.clearRect(0, 0, canvas.width, canvas.height);
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the circles
		let annotatedSongsToRedrawOnTop = []
		const drawSongCircle = (({song, x, y}, songIndex) => {
			const isSelected = $songIsSelected[songIndex];
			const isVisible = $songIsVisible[songIndex];
			const circle = new Path2D();
			// border extends into & out of the edge, so divide it in half and add it to the radius, for visual consistency
			const radius = $songRadius[songIndex] + (songInAnnotations(song, $currentStoryStep.visualEncodings.songAnnotations) ? BUBBLE_BORDER_THICKNESS / 2 : 0);
			const displayRadius = isVisible ? radius : 0;
			circle.arc(x, y, displayRadius, 0, 2 * Math.PI);

			// Only selected elements can be hovered
			if (isSelected) {
				invisibleContext.fillStyle = getInvisibleFillFromSongIndex(songIndex);
				invisibleContext.fill(circle);
			}
			// context.fillStyle = $songColor[songIndex];
			context.fillStyle = rgbaArrayToString($tweenedSongColor[songIndex]);
			context.fill(circle);

			// Draw a border around annotated songs
			if (isSelected && isVisible && $currentStoryStep.visualEncodings.useHeavierSongBorders) {
				context.strokeStyle = "#333333"; // chosen cuz it's the lightest still accessible contrast with serenade's color
				context.lineWidth = 0.5;
				context.stroke(circle);
			} else if (isSelected && isVisible) {
				context.strokeStyle = "white";
				context.lineWidth = 0.2;
				context.stroke(circle);
			}
		});

		forceSimulationData.forEach(drawSongCircle);

		annotatedSongsToRedrawOnTop.forEach((args) => drawSongCircle(...args));
	};

	const handleSongHovered = (selectedSong, songIndex, offsetX, offsetY) => {
		const nodes = $simulationStore.nodes()
		if (selectedSong && nodes) {
			const {x, y} = nodes[songIndex]
			$hoveredSongInfo = {
				song: selectedSong,
				x: offsetX,
				y: offsetY,
				circleX: x,
				circleY: y,
				circleRadius: $songRadius[songIndex]
			};
		} else if ($hoveredSongInfo.song) {
			// no need to trigger reactive update by writing to the store unless there is a song to overwrite
			$hoveredSongInfo = {};
		}
	};

	const handleMouseMove = (e) => {
		if ($showAggregateSnakeChart) return
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromClickLocation(invisibleContext, offsetX, offsetY);		
		const selectedSong = $songIsSelected[songIndex] && $songIsVisible[songIndex] && forceSimulationData[songIndex]?.song;
		handleSongHovered(selectedSong, songIndex, offsetX, offsetY);
	};

	const clearTooltip = () => $hoveredSongInfo = {}

	// TODO: do we want to do anything here? if not delete.
	const handleSongClicked = (e) => {
		// const { offsetX, offsetY } = e;
	};

	const resizeCanvases = () => {
		if (!canvas) return;
		canvas.width = $viewport.width;
		canvas.height = $viewport.height;
		invisibleCanvas.width = $viewport.width;
		invisibleCanvas.height = $viewport.height;
	};
	
	const updateSimulationProperties = () => {
		if (!simulation) return;
		simulation
			.force("x", forceX().x((_, songIndex) => $xForcePosition[songIndex]).strength($currentStoryStep.visualEncodings.forceXStrength))
			.force("y", forceY().y((_, songIndex) => $yForcePosition[songIndex] || DEFAULT_Y_ENTRANCE_POSITION).strength(
				() => $currentStoryStep.visualEncodings.forceYStrength
			))
			.force("collide", forceCollide().radius(({radius}, songIndex) => $songIsVisible[songIndex] ? $songRadius[songIndex] + 0.5 : 0).strength(0.5))
			.velocityDecay(0.3) // think of it like "friction": lower values help things slide smoother, but too much causes a sort of "bounce" effect as it oscillates towards the force center
			.alpha(0.06)
	};

	const restartSimulation = () => {
		if (!simulation) return;
		if (!$preventBubbleRestartBecauseTheUserIsMerelySearching) {
			simulation.restart()
		}
	};

	$: $xForcePosition, $yForcePosition, updateSimulationProperties();
	$: $xForcePosition, $yForcePosition, $viewport.width, $viewport.height, restartSimulation();

	$: $songIsSelected, $viewport.width, $viewport.height, $tweenedSongColor, updateViz();
	
	const updateViz = () => {
		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
	};

	onMount(() => {
		invisibleContext = invisibleCanvas.getContext("2d");
		context = canvas.getContext("2d");

		simulation = forceSimulation(forceSimulationData).on("tick", () => {
			updateVisibleAndInvisibleCanvases();
			simulationStore.set(simulation);
		});

		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
		updateSimulationProperties();
	});

	// Transition opacity between charts
	const aggregateSnakeChartOpacity = tweened(0, {
		duration: variables.chart['transition-opacity-duration'],
		easing: cubicInOut
	});

	const tweenedCoords = tweened($svgCoordsForLoveSongTypes, {
		duration: variables.chart['transition-opacity-duration'],
		easing: cubicInOut
	});

	// Transition color
	const tweenedSongColor = tweened($songColor, {
		duration: variables.chart['transition-opacity-duration'],
		easing: cubicInOut
	});

	$: {
		tweenedCoords.set($svgCoordsForLoveSongTypes);
		// @michelle: is there a good reason to move this out to its own one line reactive statement?
		tweenedSongColor.set($songColor);
		if ($showAggregateSnakeChart) {
			aggregateSnakeChartOpacity.set(1);
		} else {
			aggregateSnakeChartOpacity.set(0);
		}
	}
</script>

{#if $currentStoryStep.showXAxis}
	<XAxis />
{/if}

<svg height={$viewport.height} width={$viewport.width} style="opacity: {$aggregateSnakeChartOpacity}">
	{#each $tweenedCoords as { loveSongType, svgCoords }}
		<path d={$svgPathGenerator(svgCoords)} fill={getSnakeFill(loveSongType, $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(loveSongType), $loveSongTypeColorMap, $unselectedLoveSongTypeColorMap)} />
	{/each}
	<!-- Outline of all love songs -->
	 {#if $currentStoryStep.showLoveSongChange}
		<path d={$svgPathGenerator($svgCoordsForSnakeChartOutline)} fill="none" stroke="black" stroke-width="6" stroke-dasharray="12" />
	{/if}
</svg>

<!-- TODO: if not shown, don't run the simulation (ie for performance) -->
<canvas
	id="visible"
	style:opacity={1 - $aggregateSnakeChartOpacity}
	bind:this={canvas}
	on:mousemove={handleMouseMove}
	on:mouseleave={clearTooltip}
	on:mousedown={handleSongClicked}
/>
<canvas id="invisible" bind:this={invisibleCanvas} />

<LoveSongChangeAnnotation tweenedCoords={$tweenedCoords} />

<LoveSongTypeLabels tweenedCoords={$tweenedCoords} />

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
	#invisible {
		visibility: hidden;
	}
	svg {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
