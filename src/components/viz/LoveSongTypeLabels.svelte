<script>
	import viewport from "$stores/viewport";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	import { aSingleLoveSongTypeIsSpotlighted, currentStoryStep, precedingStepSpotlightedType } from "$stores/storySteps";
	import { nonLoveSongLabelBottomLeftCoords } from "$stores/labels";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";

	import { getXPosForYear } from "$data/data-utils";
	import { LOVE_SONG_TYPE_CONSTANTS, TEXT_SHADOW_COLOR_MAP } from "$data/data-constants";

	import NonLoveSongLabel from "./NonLoveSongLabel.svelte";
	import ToggleLoveSongCategoryButtons from "./ToggleLoveSongCategoryButtons.svelte";
	import { textShadow } from "$utils/styling";

    export let tweenedCoords;

	const DECADE_TO_PLACE_LABEL_IN = {
		[LOVE_SONG_TYPE_CONSTANTS.serenade]: 1970,
		[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: 1970,
		[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: 1980,
		[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: 2000,
	}

	const getX = (x, width, orderInNonLoveSongStack, nonLoveSongX) => {
		if (orderInNonLoveSongStack !== -1) return nonLoveSongX;
		return getXPosForYear(x, width);
	}
	const getY = (y0, height, orderInNonLoveSongStack, nonLoveSongY) => {
		console.log({orderInNonLoveSongStack, nonLoveSongY})
		if (orderInNonLoveSongStack !== -1) return nonLoveSongY;
		return getYPosForPercentage(y0, height);
	}

	const findPoint = ({svgCoords, loveSongType}) => {
		const decade = DECADE_TO_PLACE_LABEL_IN[loveSongType];
		return svgCoords.find(({x}) => x === decade);
	}

	$: labelMetadata = tweenedCoords
		.filter(({loveSongType}) => loveSongType !== LOVE_SONG_TYPE_CONSTANTS.notALoveSong && !$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs.includes(loveSongType))
		.reduce((acc, { loveSongType, svgCoords }) => {
			const {x, y0, y1} = findPoint({svgCoords, loveSongType}) || {};
			if (!x) return acc;

			const wasJustSpotlighted = $precedingStepSpotlightedType === loveSongType;
			const orderInNonLoveSongStack = $typesTreatedAsNonLoveSongs.findIndex((type) => type === loveSongType);
			const isTreatedAsNonLoveSong = orderInNonLoveSongStack !== -1;

			const baseFontSize = 16;
			const fontAdjustment = (wasJustSpotlighted && !$viewport.isLikelyInMobileLandscape ? 8 : 0) + ($viewport.isLikelyInMobileLandscape ? -4 : 0);
			return [... acc, {
				loveSongType,
				x: getX(x, $viewport.width, orderInNonLoveSongStack, $nonLoveSongLabelBottomLeftCoords.x),
				y: getY(y0, $viewport.height, orderInNonLoveSongStack, $nonLoveSongLabelBottomLeftCoords.y),
				translate: `translate(${isTreatedAsNonLoveSong ? -50 : 0}%, ${isTreatedAsNonLoveSong ? 100 + 100 * orderInNonLoveSongStack : -95}%)`,
				opacity: $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 0 : 1,
				fontSize: `${baseFontSize + fontAdjustment}px`,
				fontWeight: wasJustSpotlighted ? "bold" : "normal",
				textShadow: textShadow(2, 2, TEXT_SHADOW_COLOR_MAP[loveSongType])
			}]
		}, []);

	$: show = $currentStoryStep.showXAxis && !$currentStoryStep.isFinalComparisonStep && !$aSingleLoveSongTypeIsSpotlighted;
</script>

{#if show}
	<NonLoveSongLabel />
	{#each labelMetadata as { loveSongType, x, y, translate, opacity, fontSize, fontWeight, textShadow }}
		<div
			class={$currentStoryStep.allowUserToChangeFilters ? '' : 'no-pointer-events' }
			style:left={`${x}px`} style:top={`${y}px`}
			style:transform={translate}
			fill="black" 
			style:opacity={opacity}
			style:font-size={fontSize}
			style:font-weight={fontWeight}
			style:text-shadow={textShadow}
		>
			<ToggleLoveSongCategoryButtons loveSongType={loveSongType} />
		</div>
	{/each}	
{/if}

<style>
    div {
		font-family: 'Atlas Grotesk', sans-serif;
		position: fixed;
		transition: transform calc(var(--chart-transition-opacity-duration) * 1ms) ease, 
			left calc(var(--chart-transition-opacity-duration) * 1ms) ease,
			top calc(var(--chart-transition-opacity-duration) * 1ms) ease,
	}

	div.no-pointer-events {
		pointer-events: none;
	}
</style>