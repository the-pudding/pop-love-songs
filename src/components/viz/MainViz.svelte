<script>
	import { onMount } from "svelte";

	import { forceSimulation, forceX, forceY, forceCollide } from "d3";

	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import { songIsSelected } from "$stores/dataProperties";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";

	import songsData from "$data/songs-data.js";
	import {
		getInvisibleFillFromSongIndex,
		getSongFill,
		getSongIndexFromInvisibleFill,
		getXPositionFromTime,
		getYTargetPosition,
		searchSongOnYouTube
	} from "./viz-utils";

	// Give it an initial position
	const forceSimulationData = songsData.map(songObject => ({
		...songObject,
		x: getXPositionFromTime(songObject.song, $viewport.width),
		y: getYTargetPosition(songObject, $viewport.height)
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
			const circle = new Path2D();
			circle.arc(x, y, radius, 0, 2 * Math.PI);

			const isSelected = $songIsSelected[songIndex];

			// Invisible
			if (isSelected) {
				// prevent hover events on non-selected songs
				invisibleContext.fillStyle = getInvisibleFillFromSongIndex(songIndex);
				invisibleContext.fill(circle);
			}

			// Visible
			context.fillStyle = getSongFill(song, isSelected);
			context.fill(circle);
		});
	};

	export const handleSongHovered = (selectedSong, offsetX, offsetY) => {
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
			.force("x", forceX().x((d) => getXPositionFromTime(d.song, canvas.width)).strength(2))
			.force("y", forceY().y((d) => getYTargetPosition(d, canvas.height)).strength(0.1))
			// .force("y", forceY().y(canvas.height / 2).strength(0.5))
			.force("collide", forceCollide().radius(({radius}) => radius))
			.alpha(0.2)
			.restart();
	};

	// @michelle: I'm noticing a growing list of reactive elements here, and I'm wondering if we should be using a derived store for the data, and just make it one thing? 
	// Or is this granularity normal / good for control?
	$: $songIsSelected, $searchAndFilter, $viewport.width, $viewport.height, updateViz();
	// note: currently, simulation need only change (ie forces are updated) when viewport changes
	$: $viewport.width, $viewport.height, updateSimulationProperties(); 
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
