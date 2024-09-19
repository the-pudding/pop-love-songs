<script>
	import XandAddButton from "$components/helpers/XandAddButton.svelte";
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { currentStoryStep } from "$stores/storySteps";
	

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
    
<span class="label-button-group">
	{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
	{#if $currentStoryStep.allowUserToChangeFilters}
	<button on:click={toggleLoveSongStatus(loveSongType)}>
		<XandAddButton rotateIntoPlusSign={isTreatedAsNonLoveSong} />
	</button>
	{/if}
</span>

<style>
	span.label-button-group button {
		font-size: 12px;
        margin-right: 4px;
		margin-top: 4px;
		background: none;
    	padding: 0;
	}
</style>