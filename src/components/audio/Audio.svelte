<script>
	import _ from "lodash";
	import { base } from "$app/paths";
	import { onMount, tick } from "svelte";
	import { currentStoryStep } from "$stores/storySteps";
	import { showAnnotations } from "$stores/searchAndFilter";

	export let audioFile;
	export let onComplete;

	let audioEl;
	let loaded = false;
	let paused;

	const play = () => {
		if (!audioEl || !audioFile) return;
		audioEl.currentTime = 0; 
		audioEl.volume = 0.4; // at Matt's suggestion: "THINK OF THE EARS! SAVE THE EARS!"

		audioEl.play();
	};
	const pause = () => {
		if (!audioEl || paused) return;
		audioEl.pause();
		onComplete();
	};

	const updateSource = () => {
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
	
	$: $currentStoryStep, $showAnnotations, pause();

	onMount(async () => {
		await tick();
		setupEvents();
		// preloading, if needed
		// await loadAudio(`assets/vocals/whitney-houston_super-bowl_1991.mp3`);
	});
</script>

<audio bind:this={audioEl} bind:paused muted={false} />
