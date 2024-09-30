<script>
	import { playing } from "$stores/audio.js";
	import { accessiblyContrastingColorMap, loveSongTypeColorMap } from "$stores/colorMap";

	import PlayAndPauseButton from "./PlayAndPauseButton.svelte";

	export let songName;
	export let year;
	export let loveSongType;
	export let audioFile;

	
	$: backgroundColor = $accessiblyContrastingColorMap[loveSongType];
	$: fillColor = $loveSongTypeColorMap[loveSongType];

	$: playingMe = $playing && $playing.audioFile === audioFile;

	const onClick = () => {
		if (playingMe) {
			$playing = undefined;
		} else {
			// TODO: if song names are identical, it'll technically select both (see songSelected derived store). Solution: also pass in year and/or performer
			$playing = { audioFile, songName, year };
		}
	};
</script>

<button on:click={onClick} style:background={backgroundColor}>
	<PlayAndPauseButton {fillColor} showPauseIcon={playingMe} />
</button>

<style>
	button {
		padding: 4px; /* override Pudding default */
		border-radius: 100%;
		box-shadow: 2px 2px 4px gray;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.575);

		pointer-events: all;
		cursor: pointer;
	}

	button:hover {
		transform: scale(1.15);
	}
	
</style>
