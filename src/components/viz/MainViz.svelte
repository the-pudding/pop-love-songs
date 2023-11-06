<script>
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";
	import searchAndFilter from "$stores/searchAndFilter.js";
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
			const loveSongType = song[DATA_COLUMNS_ENUM.love_song_sub_type]
			const yPercentage =
				LOVE_SONG_TYPE_BAND_LEVEL_MAP[
					loveSongType
				] / Object.keys(LOVE_SONG_TYPE_BAND_LEVEL_MAP).length;
			const yMargin = 50;
			const centerY = 2 * yMargin + yPercentage * (canvas.height - 2 * yMargin);

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			const loveSongTypeSelected = $searchAndFilter.selectedLoveSongTypes.includes(loveSongType) || $searchAndFilter.selectedLoveSongTypes.length === 0;
			context.fillStyle = loveSongTypeSelected
				? LOVE_SONG_TYPE_COLOR_MAP[loveSongType] 
				: "rgb(0, 0, 0, 0.05)";
			context.fill();
		});
	}

	$: {
		if (context) {
			console.log('Gonna update:', $searchAndFilter.selectedLoveSongTypes);
			updateCanvas();
		}
	}
</script>

<canvas id="myCanvas" style="border: 0.5px solid black;" />
