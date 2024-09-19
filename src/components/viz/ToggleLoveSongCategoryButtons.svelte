<script>
	import XandAddButton from "$components/helpers/XandAddButton.svelte";
	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { currentStoryStep, isLastStep } from "$stores/storySteps";
	import viewport from "$stores/viewport";
	
	export let loveSongType;
	export let x;
	export let y;
	export let translate;
	export let opacity;
	export let fontSize;
	export let fontWeight;
	export let textShadow;

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


<div
	class={$isLastStep ? 'allow-toggle' : 'no-pointer-events' }
	style:left={`${x}px`} style:top={`${y}px`}
	style:transform={translate}
	fill="black" 
	style:opacity={opacity}
	style:font-size={fontSize}
	style:font-weight={fontWeight}
	style:text-shadow={textShadow}
>
	<div role="button" class="label-button-group" on:click={toggleLoveSongStatus(loveSongType)}>
		<div class="label">{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}</div>
		{#if $currentStoryStep.allowUserToChangeFilters}
			<XandAddButton rotateIntoPlusSign={isTreatedAsNonLoveSong} diameter={$viewport.isLikelyInMobileLandscape ? 24 : 28} />
		{/if}
	</div>
</div>
<style>
	.allow-toggle, .no-pointer-events {
		font-family: 'Atlas Grotesk', sans-serif;
		position: fixed;
	}
	.allow-toggle {
		transition: transform calc(var(--chart-transition-opacity-duration) * 1ms), 
			left calc(var(--chart-transition-opacity-duration) * 1ms),
			top calc(var(--chart-transition-opacity-duration) * 1ms);
		transition-delay: calc(var(--chart-transition-opacity-duration) * 0.5ms), 0s, 0s;
	}
	.no-pointer-events {
		pointer-events: none;
	}

	.label-button-group {
		display: flex;
		align-items: center;

		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.label-button-group:hover {
		transform: scale(1.02);
	}	

	.label {
		margin-right: 4px;
	}

</style>