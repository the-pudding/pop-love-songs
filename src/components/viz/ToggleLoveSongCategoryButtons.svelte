<script>
	import XandAddButton from "$components/helpers/XandAddButton.svelte";
	import { LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
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

<button on:click={toggleLoveSongStatus(loveSongType)}>
	<div
		class={`container ${$isLastStep ? 'allow-toggle' : ''}` }
		style:left={`${x}px`} style:top={`${y}px`}
		style:transform={translate}
		style:opacity={opacity}
		style:font-size={fontSize}
		style:font-weight={fontWeight}
		style:text-shadow={textShadow}
	>
		<div class="label">{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}</div>
		{#if $currentStoryStep.allowUserToChangeFilters}
			<XandAddButton
				rotateIntoPlusSign={isTreatedAsNonLoveSong}
				diameter={$viewport.isLikelyInMobileLandscape ? 24 : 28} 
				selectionColor={LOVE_SONG_TYPE_COLOR_MAP[loveSongType]}
				isSelected={isTreatedAsNonLoveSong}
			/>
		{/if}
	</div>
</button>

<style>

	.container {
		font-family: 'Atlas Grotesk', sans-serif;
		position: fixed;
		display: flex;
		align-items: center;
		pointer-events: none;
	}

	.container.allow-toggle {
		pointer-events: all;
		transition: transform calc(var(--chart-transition-opacity-duration) * 1ms), 
			left calc(var(--chart-transition-opacity-duration) * 1ms),
			top calc(var(--chart-transition-opacity-duration) * 1ms);
		transition-delay: calc(var(--chart-transition-opacity-duration) * 0.5ms), 0s, 0s;
	}

	.label {
		margin-right: 4px;
	}
</style>