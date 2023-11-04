<script>
	import viewport from "$stores/viewport.js";
	import data from "$data/16-EXPORT-viz-ready-data.json";

	const DATA_COLUMNS_ENUM = {
		performer: 0,
		song: 1,
		generic_genre: 2,
		gender: 3,
		date_as_decimal: 4,
		love_song_sub_type: 5
	};
	import { onMount } from "svelte";

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

		// Set the circle's properties
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = 20;
		const fillColor = "blue";

		// Draw the circle
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		context.fillStyle = fillColor;
		context.fill();
	}
</script>

<!-- <p>
	The first performer in the dataset: {data[0][DATA_COLUMNS_ENUM.performer]}
</p> -->

<canvas id="myCanvas" style="border: 0.5px solid black;" />
