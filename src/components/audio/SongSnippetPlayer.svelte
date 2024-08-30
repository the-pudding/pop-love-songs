<script>
	import { playing } from "$stores/audio.js";
	import PlayAndPauseButton from "./PlayAndPauseButton.svelte";

	export let audioFileName;

	$: playingMe = $playing && $playing.audioFileName === audioFileName;

	const onClick = () => {
		if (playingMe) {
			$playing = undefined;
		} else {
			$playing = { audioFileName };
		}
	};
</script>

<button on:click={onClick}>
	<PlayAndPauseButton paused={!playingMe} />
</button>

<style>
	
</style>
