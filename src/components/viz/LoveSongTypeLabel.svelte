<script>
	import XandAddButton from "$components/helpers/XandAddButton.svelte";
	import { ACCESSIBLY_CONTRASTING_COLOR_MAP, LOVE_SONG_TYPE_COLOR_MAP, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { isEndingSandboxStep } from "$stores/storySteps";
	import viewport from "$stores/viewport";
	
	export let loveSongType;
	export let x;
	export let y;
	export let translate;
	export let visibility;
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
	$: _ariaLabel = `${isTreatedAsNonLoveSong ? 'Add back' : 'Remove'} "${LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}" ${isTreatedAsNonLoveSong ? 'to' : 'from'} love song categories`
	$: ariaLabel = $isEndingSandboxStep ? _ariaLabel : ''

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			toggleLoveSongStatus(loveSongType)();
		}
	};
</script>

<!-- Note: this element needs to be a li (since its in a list), and for better screen reader UX we don't want to nest an additional button inside it -->
<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<li
	role="button"
	tabindex={$isEndingSandboxStep ? 0 : -1}
	class={$isEndingSandboxStep ? 'allow-toggle' : ''}
	on:click={toggleLoveSongStatus(loveSongType)}
	on:keydown={handleKeyDown}
	style:left={`${x}px`} style:top={`${y}px`}
	style:transform={translate}
	style:visibility={visibility}
	style:font-size={fontSize}
	style:font-weight={fontWeight}
	style:text-shadow={textShadow}
>
	<div class="label" aria-label={ariaLabel}>{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}</div>
	{#if $isEndingSandboxStep}
		<XandAddButton
			rotateIntoPlusSign={isTreatedAsNonLoveSong}
			diameter={$viewport.isLikelyInMobileLandscape ? 24 : 28} 
			selectionColor={LOVE_SONG_TYPE_COLOR_MAP[loveSongType]}
			selectionBackgroundColor={ACCESSIBLY_CONTRASTING_COLOR_MAP[loveSongType]}
			isSelected={isTreatedAsNonLoveSong}
		/>
	{/if}
</li>

<style>
	li {
		font-family: 'Atlas Grotesk', sans-serif;
		position: fixed;
		display: flex;
		align-items: center;
		pointer-events: none;

		background-color: transparent;

		z-index: 100000;
	}

	li:hover, li:focus {
		cursor: pointer;
		border-bottom: 1px solid transparent;
	}

	li:hover .label,
	li:focus .label {
		font-weight: bold;
	}

	li.allow-toggle {
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