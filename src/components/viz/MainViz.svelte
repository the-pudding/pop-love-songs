<script>
	import { onMount } from "svelte";
	import { afterNavigate } from "$app/navigation"; // TEMP, for development

	import { forceSimulation, forceX, forceY, forceCollide } from "d3";

	import viewport from "$stores/viewport.js";
	import { songIsSelected, songIsVisible } from "$stores/dataDerivations";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";

	import songsData from "$data/songs-data.js";
	import {
		getInvisibleFillFromSongIndex,
		getSongFill,
		getSongIndexFromInvisibleFill,
		searchSongOnYouTube
	} from "./viz-utils";
	import { DEFAULT_Y_ENTRANCE_POSITION } from "$stores/forcePositionOptions-helper";
	import { xForcePosition, yForcePosition } from "$stores/visualEncodings";
	import { aggregateSnakeChartPositions } from "$stores/aggregateSnakeChartPositions";

	// Give it an initial position
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
		if (!context) return;

		// clear the canvas
		invisibleContext.clearRect(0, 0, canvas.width, canvas.height);
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the circles
		forceSimulationData.forEach(({song, radius, x, y}, songIndex) => {
			const isSelected = $songIsSelected[songIndex];
			const isVisible = $songIsVisible[songIndex];
			const circle = new Path2D();
			const displayRadius = isVisible ? radius : 0;
			circle.arc(x, y, displayRadius, 0, 2 * Math.PI);

			// Only selected elements can be hovered
			if (isSelected) {
				invisibleContext.fillStyle = getInvisibleFillFromSongIndex(songIndex);
				invisibleContext.fill(circle);
			}
			context.fillStyle = getSongFill(song, isSelected);
			context.fill(circle);
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
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromInvisibleFill(
			invisibleContext,
			offsetX,
			offsetY
		);
		const selectedSong = forceSimulationData[songIndex]?.song;
		handleSongHovered(selectedSong, offsetX, offsetY);
	};

	const handleSongClicked = (e) => {
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromInvisibleFill(
			invisibleContext,
			offsetX,
			offsetY
		);
		const selectedSong = forceSimulationData[songIndex]?.song;
		if (selectedSong) {
			// This is just to make it easier to pull up a song on YouTube
			searchSongOnYouTube(selectedSong);
		}
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
			.force("x", forceX().x((_, songIndex) => $xForcePosition[songIndex]).strength(2))
			.force("y", forceY().y((_, songIndex) => $yForcePosition[songIndex] || DEFAULT_Y_ENTRANCE_POSITION).strength(1))
			.force("collide", forceCollide().radius(({radius}, songIndex) => $songIsVisible[songIndex] ? radius : 0))
			.alpha(0.07)
			.restart();
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
			console.log('updating viz with simulation')
			updateVisibleAndInvisibleCanvases();
		});

		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
		updateSimulationProperties();

		
	});

	afterNavigate(() => // TEMP for development
		{
			let loveSongType = 1
			const PADDING_BETWEEN_TIME_REGIONS = 0 // TODO: regions are arleady a year apart, but should be in most sensible unit
			let vizData = $aggregateSnakeChartPositions.reduce(
				(accum, timeRegion) => {
		
					const {y0, y1} = timeRegion.popularityScoreSumsInTimeRegion[loveSongType] || {}
					return {...accum, 
						x: [...accum.x, timeRegion.start, timeRegion.stop - PADDING_BETWEEN_TIME_REGIONS],
						y0: [...accum.y0, y0, y0],
						y1: [...accum.y1, y1, y1]
					}
				}, 
				{x: [], y0: [], y1: []}
				)
			console.log(vizData)
		})

</script>

<canvas
	id="visible"
	bind:this={canvas}
	on:mousemove={handleMouseMove}
	on:mousedown={handleSongClicked}
/>
<canvas id="invisible" bind:this={invisibleCanvas} />

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
