<script>
	import { ACCESSIBLY_CONTRASTING_COLOR_MAP, LOVE_SONG_TYPE_COLOR_MAP } from "$data/data-constants";
	import { playing } from "$stores/audio.js";
	import PlayAndPauseButton from "./PlayAndPauseButton.svelte";

	export let loveSongType;
	export let audioFile;

	$: backgroundColor = ACCESSIBLY_CONTRASTING_COLOR_MAP[loveSongType];
	$: fillColor = LOVE_SONG_TYPE_COLOR_MAP[loveSongType];

	$: playingMe = $playing && $playing.audioFile === audioFile;

	const onClick = () => {
		if (playingMe) {
			$playing = undefined;
		} else {
			$playing = { audioFile };
		}
	};
</script>

<button on:click={onClick} style:background={backgroundColor}>
	<PlayAndPauseButton {fillColor} paused={playingMe} />
</button>

<style>
	button {
		padding: 4px; /* override Pudding default */
		border-radius: 100%;
		transition: opacity 0.3s;
	}

	button:hover {
		opacity: 0.7;
	}
	
</style>
