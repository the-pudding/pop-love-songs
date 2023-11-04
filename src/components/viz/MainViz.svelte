<script>
	import data from "$data/16-EXPORT-viz-ready-data.json";
	// console.log(data);

	// (key, probably doesn't live her ultimatley)
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

	onMount(() => {
		// Get a reference to the canvas element and its 2D drawing context
		canvas = document.getElementById("myCanvas");

		context = canvas.getContext("2d");

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
	});
</script>

<h2>(This will become the main viz)</h2>

<p>
	The first performer in the dataset: {data[0][DATA_COLUMNS_ENUM.performer]}
</p>

<canvas
	id="myCanvas"
	width="200"
	height="200"
	style="border: 1px solid black;"
/>
