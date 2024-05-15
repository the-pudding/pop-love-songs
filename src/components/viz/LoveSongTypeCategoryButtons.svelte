<script>
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP, LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { currentStoryStep } from "$stores/storySteps";
	

    export let loveSongType;

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
    {#if $currentStoryStep.allowUserToChangeFilters}
        <!-- TODO: Make button set accessible -->
        <span class="label-button-group">
            {#if loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong}
                {#each $typesTreatedAsNonLoveSongs as nonLoveSongType}
                    <button on:click={toggleLoveSongStatus(nonLoveSongType)}>add back {LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[nonLoveSongType]}</button>
                {/each}
            {:else}
                <button on:click={toggleLoveSongStatus(loveSongType)}>remove</button>
            {/if}
        </span>
    {/if}
	


<style>
	span.label-button-group button {
		font-size: 12px;
        margin-right: 4px;
	}
</style>