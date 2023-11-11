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
		getYPosition
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

			// Invisible (top)
			invisibleContext.fillStyle = getInvisibleFillFromSongIndex(songIndex);
			invisibleContext.fill(circle);

			// Visible (bottom)
			context.fillStyle = getSongFill(song, $searchAndFilter);
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
		if (songIndex !== null) {
			console.log(songIndex, songsData[songIndex]);
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
			console.log("Gonna update:", $searchAndFilter);
			updateVisibleAndInvisibleCanvases();
		}
	}
</script>

<canvas id={VISIBLE_CANVAS_ID} on:mousemove={handleMouseMove} />
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
