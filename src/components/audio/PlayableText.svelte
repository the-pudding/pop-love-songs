<script>
	import { playing } from "$stores/audio.js";
	import PlayAndPauseButton from "./PlayAndPauseButton.svelte";

	export let audioFileName;
	export let text;

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
	{text}
	<PlayAndPauseButton paused={!playingMe} />
</button>

<style>
	button {
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		font-family: var(--sans);
		/* background: var(--color-fg); */
		color: var(--color-bg);
		text-transform: uppercase;
		font-weight: bold;
		margin: 0;
		padding: 0.25rem 0.35rem 0.25rem 0.5rem;
		border-radius: 0.25rem;
		white-space: nowrap;
		transition: all calc(var(--1s) * 0.25) ease-in-out;
		background-size: 1rem;
	}
	button:hover {
		background: #fbf3df;
		transform: translateY(-1px);
		box-shadow: rgba(0, 0, 0, 0.25) 0 2px 8px;
	}
	div {
		display: inline-block;
		width: 1.5em;
		height: 1.5em;
		margin-left: 0.25rem;
		background-position: center;
		background-size: 1.25rem;
		background-repeat: no-repeat;
	}

	@media (max-width: 600px) {
		button {
			padding: 0.125rem 0.35rem 0.125rem 0.5rem;
		}
	}
</style>
