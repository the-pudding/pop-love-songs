<script>
	import { derived } from "svelte/store";

	import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP, LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import viewport from "$stores/viewport";
	import { typesTreatedAsNonLoveSongs, visibleButNotSelectedLoveSongTypes } from "$stores/searchAndFilter";
	import { getXPosForYear } from "$data/data-utils";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	

    export let tweenedCoords;

	// @michelle: is this an anti-pattern? ie mixing store derivation with reactive statements
	$: labelMetadata = derived(
		[visibleButNotSelectedLoveSongTypes, viewport],
		([$visibleButNotSelectedLoveSongTypes, $viewport]) => {
			return tweenedCoords.reduce((acc, { loveSongType, svgCoords }) => {
				const MIN_Y_HEIGHT_TO_FIT_LABEL = 0.04;
				const {x, y0, y1} = svgCoords.find(({y0, y1}) => (y0 - y1) >= MIN_Y_HEIGHT_TO_FIT_LABEL) || {};
				if (x === undefined || y0 === undefined) return acc;

				return [... acc, {
					loveSongType,
					x: getXPosForYear(x, $viewport.width),
					// TODO: @michelle there's gotta be a better way to align text to the baseline via css...
					// TODO: Also, I think I need to factor in the conditional margin between snakes...
					y: getYPosForPercentage(y0, $viewport.height) - 0.035 * $viewport.height,
					opacity: $visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 0 : 1,
					// TODO: for some reason, I can't seem to set the style:fontSize property on the dev... ?
					fontSize: (y0 - y1) < 2 * MIN_Y_HEIGHT_TO_FIT_LABEL ? "clamp(0.5rem, 2vw, .75rem)" : "clamp(1rem, 2vw, 1.25rem)"
				}]
			}, []);
		}
	);

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
{#each $labelMetadata as { loveSongType, x, y, opacity, fontSize }}
	<div class="snake-label" style:left={`${x}px`} style:top={`${y}px`} fill="black" style:opacity={opacity} style:fontSize={fontSize}>
		{#if loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong}
			{#each $typesTreatedAsNonLoveSongs as nonLoveSongType}
				<button on:click={toggleLoveSongStatus(nonLoveSongType)}>add back {LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[nonLoveSongType]} to love songs</button>
			{/each}
		{:else}
			{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]} 
			<button on:click={toggleLoveSongStatus(loveSongType)}>remove from love songs</button>
		{/if}
	</div>
{/each}

<style>
    div.snake-label {
		/* TODO: For some reason I can only set font-size via css... */
		font-size: clamp(1rem, 2vw, 1.25rem);
		position: fixed;
	}
	div button {
		font-size: 12px;
	}
</style>