<script>
	import { onMount } from "svelte";

	import { forceSimulation, forceX, forceY, forceCollide } from "d3";

	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";

	import songsData from "$data/songs-data.js";
	import {
		getInvisibleFillFromSongIndex,
		getSongFill,
		getSongIndexFromInvisibleFill,
		getXPosition,
		getYPosition,
		searchSongOnYouTube,
		songIsSelected
	} from "./viz-utils";

	const SONG_RADIUS = 5;

	// Give it an initial position
	const forceSimulationData = songsData.map(({song}) => ({
		song,
		x: getXPosition(song, $viewport.width),
		y: getYPosition(song, $viewport.height)
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
		forceSimulationData.forEach(({song, x, y}, songIndex) => {
			const circle = new Path2D();
			circle.arc(x, y, SONG_RADIUS, 0, 2 * Math.PI);

			const isSelected = songIsSelected(song, $searchAndFilter);

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
			.force("x", forceX().x((d) => getXPosition(d.song, canvas.width)))
			.force("y", forceY().y((d) => getYPosition(d.song, canvas.height)))
			.force("collide", forceCollide().radius(SONG_RADIUS))
			.alpha(1)
			.restart();
	};

	$: $searchAndFilter, $viewport.width, $viewport.height, updateViz();
	const updateViz = () => {
		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
		updateSimulationProperties();
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
