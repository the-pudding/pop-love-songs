<script>
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import songsData from "$data/16-EXPORT-viz-ready-data.json";
	import {
		getInvisibleFillFromSongIndex,
		getSongFill,
		getSongIndexFromInvisibleFill,
		getXPosition,
		getYPosition,
		searchSongOnYouTube,
		songIsSelected
	} from "./viz-utils";

	export let handleSongHovered;

	let canvas;
	let context;
	let invisibleCanvas;
	let invisibleContext;

	const updateVisibleAndInvisibleCanvases = () => {
		if (!context) return;

		// clear the canvas
		invisibleContext.clearRect(0, 0, canvas.width, canvas.height);
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the circles
		songsData.forEach((song, songIndex) => {
			const circle = new Path2D();
			const x = getXPosition(song, canvas.width);
			const y = getYPosition(song, canvas.height);
			const radius = 5;
			circle.arc(x, y, radius, 0, 2 * Math.PI);

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

	const handleMouseMove = (e) => {
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromInvisibleFill(
			invisibleContext,
			offsetX,
			offsetY
		);
		const selectedSong = songsData[songIndex];
		handleSongHovered(selectedSong, offsetX, offsetY);
	};

	const handleSongClicked = (e) => {
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromInvisibleFill(
			invisibleContext,
			offsetX,
			offsetY
		);
		const selectedSong = songsData[songIndex];
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

	$: $searchAndFilter, $viewport.width, $viewport.height, updateViz();
	const updateViz = () => {
		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
	};

	onMount(() => {
		invisibleContext = invisibleCanvas.getContext("2d");
		context = canvas.getContext("2d");

		resizeCanvases();
		updateVisibleAndInvisibleCanvases();
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
