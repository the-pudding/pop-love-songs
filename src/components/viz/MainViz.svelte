<script>
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import data from "$data/16-EXPORT-viz-ready-data.json";
	import {
		DATA_COLUMNS_ENUM,
		LOVE_SONG_TYPE_BAND_LEVEL_MAP,
		LOVE_SONG_TYPE_COLOR_MAP
	} from "$data/data-constants.js";

	let canvas;
	let context;
	let width = 0;
	let height = 0;

	onMount(() => {
		canvas = document.getElementById("myCanvas");
		context = canvas.getContext("2d");

		const unsubscribe = viewport.subscribe(({ width: w, height: h }) => {
			width = w;
			height = h;
			canvas.width = width;
			canvas.height = height;
			updateCanvas();
		});

		updateCanvas();

		return unsubscribe; // return the unsubscribe function to cleanup on component unmount
	});

	function updateCanvas() {
		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the circles
		const radius = 1;

		const YEAR_MAX = 2022;
		const YEAR_MIN = 1958;
		const DOMAIN = YEAR_MAX - YEAR_MIN;

		data.forEach((song) => {
			const xPercentage =
				(song[DATA_COLUMNS_ENUM.date_as_decimal] - YEAR_MIN) / DOMAIN;
			const centerX = xPercentage * canvas.width;

			// TODO: use d3 scale to determine band
			const yPercentage =
				LOVE_SONG_TYPE_BAND_LEVEL_MAP[
					song[DATA_COLUMNS_ENUM.love_song_sub_type]
				] / Object.keys(LOVE_SONG_TYPE_BAND_LEVEL_MAP).length;
			const yMargin = 50;
			const centerY = 2 * yMargin + yPercentage * (canvas.height - 2 * yMargin);

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			context.fillStyle =
				LOVE_SONG_TYPE_COLOR_MAP[song[DATA_COLUMNS_ENUM.love_song_sub_type]];
			context.fill();
		});
	}
</script>

<canvas id="myCanvas" style="border: 0.5px solid black;" />
