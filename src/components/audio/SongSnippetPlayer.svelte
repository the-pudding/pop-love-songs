<script>
	import { playing } from "$stores/audio.js";
	import PlayAndPauseButton from "./PlayAndPauseButton.svelte";

	export let audioFile;

	$: playingMe = $playing && $playing.audioFile === audioFile;

	const onClick = () => {
		if (playingMe) {
			$playing = undefined;
		} else {
			$playing = { audioFile };
		}
	};
</script>

<button on:click={onClick}>
	<PlayAndPauseButton paused={!playingMe} />
</button>

<style>
	
</style>
