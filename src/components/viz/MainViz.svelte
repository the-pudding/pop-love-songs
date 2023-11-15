<script>
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
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

	const VISIBLE_CANVAS_ID = "visible-canvas";
	const INVISIBLE_CANVAS_ID = "invisible-canvas";
	let canvas;
	let context;
	let invisibleCanvas;
	let invisibleContext;

	onMount(() => {
		invisibleCanvas = document.getElementById(INVISIBLE_CANVAS_ID);
		invisibleContext = invisibleCanvas.getContext("2d");
		canvas = document.getElementById(VISIBLE_CANVAS_ID);
		context = canvas.getContext("2d");
	});

	function updateVisibleAndInvisibleCanvases() {
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
	}

	const handleMouseMove = (e) => {
		const { offsetX, offsetY } = e;
		const songIndex = getSongIndexFromInvisibleFill(
			invisibleContext,
			offsetX,
			offsetY
		);
		const selectedSong = songsData[songIndex];
		if (selectedSong) {
			console.log("mouse move!");
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

	// Reactive updates
	$: {
		if (canvas) {
			canvas.width = $viewport.width;
			canvas.height = $viewport.height;
			invisibleCanvas.width = $viewport.width;
			invisibleCanvas.height = $viewport.height;
		}

		if (context) {
			$searchAndFilter; // trigger reactive update
			updateVisibleAndInvisibleCanvases();
		}
	}
</script>

<canvas
	id={VISIBLE_CANVAS_ID}
	on:mousemove={handleMouseMove}
	on:mousedown={handleSongClicked}
/>
<canvas id={INVISIBLE_CANVAS_ID} />

<style>
	#invisible-canvas {
		visibility: hidden;
	}
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
