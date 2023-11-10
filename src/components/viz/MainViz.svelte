<script>
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
	import data from "$data/16-EXPORT-viz-ready-data.json";
	import {
		DATA_COLUMNS_ENUM,
		LOVE_SONG_TYPE_BAND_LEVEL_MAP
	} from "$data/data-constants.js";
	import { getSongFill, getXPosition, getYPosition } from "./viz-utils";

	let canvas;
	let context;

	onMount(() => {
		canvas = document.getElementById("myCanvas");
		context = canvas.getContext("2d");
	});

	// TODO: have it take all reactive variables as args, move to another file
	function updateCanvas() {
		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the circles
		const radius = 1;

		data.forEach((song) => {
			const x = getXPosition(song, canvas.width);
			const y = getYPosition(song, canvas.height);
			context.beginPath();
			context.arc(x, y, radius, 0, 2 * Math.PI);

			context.fillStyle = getSongFill(song, $searchAndFilter);
			context.fill();
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

<canvas id="myCanvas" style="border: 0.5px solid black;" />
