<script>
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import data from "$data/16-EXPORT-viz-ready-data.json";
	import { getSongFill, getXPosition, getYPosition } from "./viz-utils";

	const VISIBLE_CANVAS_ID = "visible-canvas";
	const INVISIBLE_CANVAS_ID = "invisible-canvas";
	let canvas;
	let context;
	let invisibleCanvas;
	let invisibleContext;

	onMount(() => {
		canvas = document.getElementById(VISIBLE_CANVAS_ID);
		context = canvas.getContext("2d");
	});

	// TODO: have it take all reactive variables as args, move to another file
	function updateCanvas() {
		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the circles
		data.forEach((song) => {
			const circle = new Path2D();
			const x = getXPosition(song, canvas.width);
			const y = getYPosition(song, canvas.height);
			const radius = 1;
			circle.arc(x, y, radius, 0, 2 * Math.PI);

			// TODO: Add visible & invisible (hover) circles
			context.fillStyle = getSongFill(song, $searchAndFilter);
			context.fill(circle);
		});
	}

	// Reactive updates
	$: {
		if (canvas) {
			canvas.width = $viewport.width;
			canvas.height = $viewport.height;
		}

		if (context) {
			console.log("Gonna update:", $searchAndFilter);
			updateCanvas();
		}
	}
</script>

<canvas id={INVISIBLE_CANVAS_ID} style="border: 10px solid red;" />
<canvas id={VISIBLE_CANVAS_ID} style="border: 0.5px solid black;" />
