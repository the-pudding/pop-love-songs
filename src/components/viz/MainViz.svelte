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

		const YEAR_MAX = 2022;
		const YEAR_MIN = 1958;
		const DOMAIN = YEAR_MAX - YEAR_MIN;

		data.forEach((song) => {
			const xPercentage =
				(song[DATA_COLUMNS_ENUM.date_as_decimal] - YEAR_MIN) / DOMAIN;
			const centerX = xPercentage * canvas.width;

			// TODO: use d3 scale to determine band
			const loveSongType = song[DATA_COLUMNS_ENUM.love_song_sub_type];
			const yPercentage =
				LOVE_SONG_TYPE_BAND_LEVEL_MAP[loveSongType] /
				Object.keys(LOVE_SONG_TYPE_BAND_LEVEL_MAP).length;
			const yMargin = 50;
			const centerY = 2 * yMargin + yPercentage * (canvas.height - 2 * yMargin);

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI);

			// TODO: this can probably be moved to it's own file concerning color & filter logic
			const getSongFill = (song) => {
				const loveSongTypeSelected =
					$searchAndFilter.selectedLoveSongTypes.includes(loveSongType) ||
					$searchAndFilter.selectedLoveSongTypes.length === 0;
				const performerSelected =
					$searchAndFilter.performerSearchString.length === 0 ||
					song[DATA_COLUMNS_ENUM.performer]
						.toLowerCase()
						.includes($searchAndFilter.performerSearchString.toLowerCase());
				const songSelected =
					$searchAndFilter.songSearchString.length === 0 ||
					song[DATA_COLUMNS_ENUM.song]
						.toLowerCase()
						.includes($searchAndFilter.songSearchString.toLowerCase());
				return loveSongTypeSelected && performerSelected && songSelected
					? LOVE_SONG_TYPE_COLOR_MAP[loveSongType]
					: "rgb(0, 0, 0, 0.05)";
			};

			context.fillStyle = getSongFill(song);
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
