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
    
<div class="label-button-group">
	<div class="label">{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}</div>
	{#if $currentStoryStep.allowUserToChangeFilters}
		<button on:click={toggleLoveSongStatus(loveSongType)}>
			<XandAddButton rotateIntoPlusSign={isTreatedAsNonLoveSong} diameter={$viewport.isLikelyInMobileLandscape ? 24 : 28} />
		</button>
	{/if}
</div>

<style>
	.label-button-group {
		display: flex;
		align-items: center;
	}
	.label {

	}
	button {
		font-size: 12px;
		margin-top: 2px;
        margin-left: 6px;
		background: none;
    	padding: 0;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.575);
	}

	button:hover {
		transform: scale(1.15);
	}
</style>