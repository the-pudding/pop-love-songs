<script>
	import _ from "lodash";
	import { base } from "$app/paths";
	import { audioCanPlay } from "$stores/audio.js";
	import { onMount, tick } from "svelte";
	import { currentStoryStep } from "$stores/storySteps";

	export let audioFile;
	export let onComplete;

	let audioEl;
	let loaded = false;
	let paused;

	const play = () => {
		if (!audioEl || !audioFile) return;
		audioEl.currentTime = 0; // TODO: assuming we always want to restart?
		audioEl.play();
	};
	const pause = () => {
		if (!audioEl || paused) return;
		audioEl.pause();
		onComplete();
	};

	const updateSource = () => {
		$audioCanPlay = false;
		loaded = false;
		const src = `${base}/assets/audio/${audioFile}.mp3`;
		audioEl.src = src;
		audioEl.load();
	};
	const onVisibilityChange = () => {
		const hidden = document.hidden;
		if (hidden && paused === false) pause();
		else if (!hidden) play();
	};
	const setupEvents = () => {
		audioEl.addEventListener("canplay", () => {
			if (!loaded) {
				$audioCanPlay = true;
				loaded = true;
				play();
			}
		});
		document.addEventListener("visibilitychange", onVisibilityChange);
		audioEl.addEventListener("ended", () => {
			paused = true;
			onComplete();
		});
	};

	$: if (audioFile) updateSource();
	$: if (!audioFile) pause();
	// @michelle: Ok, so this works. But the software nerd in me is like "but but ... seperation of concerns!". Any clever ideas on moving this out?
	$: $currentStoryStep, pause();

	onMount(async () => {
		await tick();
		setupEvents();
		// preloading, if needed
		// await loadAudio(`assets/vocals/whitney-houston_super-bowl_1991.mp3`);
	});
</script>

<audio bind:this={audioEl} bind:paused muted={false} />
