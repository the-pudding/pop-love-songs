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
	import {
		getInvisibleFillFromSongIndex,
		getSnakeFill,
		getSongFill,
		getSongIndexFromClickLocation
	} from "./viz-utils";
	import { DEFAULT_Y_ENTRANCE_POSITION } from "$stores/forcePositionOptions-helper";
	import { loveSongTypeColorMap, songRadius, unselectedLoveSongTypeColorMap, xForcePosition, yForcePosition } from "$stores/visualEncodings";
	import { svgPathGenerator, svgCoordsForLoveSongTypes } from "$stores/aggregateSnakeChartPositions";
	import { currentStoryStep, preventBubbleRestartBecauseTheUserIsMerelySearching, restartBubbles } from "$stores/storySteps";
	import { showAggregateSnakeChart } from "$stores/searchAndFilter";
	import { songInAnnotations } from "$data/data-utils";
	import LoveSongChangeAnnotation from "./LoveSongChangeAnnotation.svelte";	
	import { LOVE_SONG_TYPE_CONSTANTS, SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";

	// Initiate mutable simulation, give bubbles an initial position
	const forceSimulationData = songsData.map((songObject, songIndex) => ({
		...songObject,
		
		x: $currentStoryStep.visualEncodings.onLoadUseRandomInitialPositions ? 2 * Math.random() * $viewport.width - $viewport.width / 2 : $xForcePosition[songIndex],
		y: $currentStoryStep.visualEncodings.onLoadUseRandomInitialPositions ? 2 * Math.random() * $viewport.height - $viewport.height / 2 : $yForcePosition[songIndex]
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
		forceSimulationData.forEach(({song, x, y}, songIndex) => {
			const isSelected = $songIsSelected[songIndex];
			const isVisible = $songIsVisible[songIndex];
			const circle = new Path2D();
			const radius = $songRadius[songIndex];
			const displayRadius = isVisible ? radius : 0;
			circle.arc(x, y, displayRadius, 0, 2 * Math.PI);

			// Only selected elements can be hovered
			if (isSelected) {
				invisibleContext.fillStyle = getInvisibleFillFromSongIndex(songIndex);
				invisibleContext.fill(circle);
			}
			context.fillStyle = getSongFill(song, isSelected, $loveSongTypeColorMap, $unselectedLoveSongTypeColorMap);
			context.fill(circle);

			// Draw a border around annotated songs
			if (songInAnnotations(song, $currentStoryStep.visualEncodings.songAnnotations)) {
				context.strokeStyle = "black";
				context.lineWidth = 4;
				context.stroke(circle);
			} else if (isSelected && isVisible) {
				context.strokeStyle = "white";
				context.lineWidth = 0.2;
				context.stroke(circle);
			}
		});
	};

	const handleSongHovered = (selectedSong, offsetX, offsetY) => {
		if (selectedSong) {
			$hoveredSongInfo = {
				song: selectedSong,
				x: offsetX,
				y: offsetY
			};
		} else if ($hoveredSongInfo.song) {
			// no need to trigger reactive update by writing to the store unless there is a song to overwrite
			$hoveredSongInfo = {
				song: null,
				x: null,
				y: null
			};
		}
	};

	const handleMouseMove = (e) => {
		if ($showAggregateSnakeChart) return
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromClickLocation(invisibleContext, offsetX, offsetY);		
		const selectedSong = $songIsSelected[songIndex] && $songIsVisible[songIndex] && forceSimulationData[songIndex]?.song;
		handleSongHovered(selectedSong, offsetX, offsetY);
	};

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

	const isNotALoveSong = (song) => song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type] === LOVE_SONG_TYPE_CONSTANTS.notALoveSong;
	const updateSimulationProperties = () => {
		if (!simulation) return;
		simulation
			.force("x", forceX().x((_, songIndex) => $xForcePosition[songIndex]).strength($currentStoryStep.visualEncodings.forceXStrength))
			.force("y", forceY().y((_, songIndex) => $yForcePosition[songIndex] || DEFAULT_Y_ENTRANCE_POSITION).strength(
				// The non love songs generally have more ground to spread out over, so we reduce the strength of the y force for them
				({song}) => $currentStoryStep.visualEncodings.forceYStrength * (isNotALoveSong(song) ? 0.1 : 1)
			))
			.force("collide", forceCollide().radius(({radius}, songIndex) => $songIsVisible[songIndex] ? $songRadius[songIndex] + 0.5 : 0).strength(0.5))
			.velocityDecay(0.3) // think of it like "friction": lower values help things slide smoother, but too much causes a sort of "bounce" effect as it oscillates towards the force center
			.alpha(0.06)
		
		if ($restartBubbles && !$preventBubbleRestartBecauseTheUserIsMerelySearching) {
			simulation.restart()
		}
	};

	// @michelle: I'm noticing a growing list of reactive elements here, and I'm wondering if we should be using a derived store for the data, and just make it one thing? 
	// Or is this granularity normal / good for control?
	$: $songIsSelected, $viewport.width, $viewport.height, updateViz();
	// simulation force layout properties need to be update when viewport or target x/yForcePosition changes
	$: $xForcePosition, $yForcePosition, $viewport.width, $viewport.height, updateSimulationProperties(); 
	const updateViz = () => {
		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
	};

	onMount(() => {
		invisibleContext = invisibleCanvas.getContext("2d");
		context = canvas.getContext("2d");

		simulation = forceSimulation(forceSimulationData).on("tick", () => {
			updateVisibleAndInvisibleCanvases();
		});

		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
		updateSimulationProperties();

		
	});

	// Transition opacity between charts
	const CHART_TRANSITION_OPACITY_DURATION = 800
	const aggregateSnakeChartOpacity = tweened(0, {
		duration: CHART_TRANSITION_OPACITY_DURATION,
		easing: cubicInOut
	});

	const tweenedCoords = tweened($svgCoordsForLoveSongTypes, {
		duration: 800,
		easing: cubicInOut
	});

	$: {
		tweenedCoords.set($svgCoordsForLoveSongTypes);
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
		<g fill="none" stroke-width="1" stroke-miterlimit="1">
			<path d={$svgPathGenerator.lineY1()(svgCoords)} stroke="#000"></path>
			<path d={$svgPathGenerator.lineY0()(svgCoords)} stroke="#000"></path>
		</g>
	{/each}
</svg>

<!-- TODO: if not shown, don't run the simulation (ie for performance) -->
<canvas
	id="visible"
	style:opacity={1 - $aggregateSnakeChartOpacity}
	bind:this={canvas}
	on:mousemove={handleMouseMove}
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
</style>
