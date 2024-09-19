<script>
	import XandAddButton from "$components/helpers/XandAddButton.svelte";
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { currentStoryStep } from "$stores/storySteps";
	import viewport from "$stores/viewport";
	

    export let loveSongType;
	$: isTreatedAsNonLoveSong = $typesTreatedAsNonLoveSongs.includes(loveSongType);

	const toggleLoveSongStatus = (loveSongType) => () => {
		typesTreatedAsNonLoveSongs.update((typesTreatedAsNonLoveSongs) => {
			if (typesTreatedAsNonLoveSongs.includes(loveSongType)) {
				return typesTreatedAsNonLoveSongs.filter((type) => type !== loveSongType);
			} else {
				return [...typesTreatedAsNonLoveSongs, loveSongType];
			}
		});
	}
</script>

<!-- TODO: this should be a button, but that screws up the inheritted text style from the parent. Solution: use slots, I think. Or just move the outer layer into this component. -->
<div role="button" class="label-button-group" on:click={toggleLoveSongStatus(loveSongType)}>
	<div class="label">{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}</div>
	{#if $currentStoryStep.allowUserToChangeFilters}
		<XandAddButton rotateIntoPlusSign={isTreatedAsNonLoveSong} diameter={$viewport.isLikelyInMobileLandscape ? 24 : 28} />
	{/if}
</div>

<style>
	.label-button-group {
		display: flex;
		align-items: center;

		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.label-button-group:hover {
		transform: scale(1.02);
	}	
</style>