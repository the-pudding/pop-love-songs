<script>
	import viewport from "$stores/viewport";
	import { getXPositionForYear, getYPositionForPercentage } from "$stores/canvasPosition";
	import { aSingleLoveSongTypeIsSpotlighted, currentStoryStep, isEndingSandboxStep, precedingStepSpotlightedType } from "$stores/storySteps";
	import { nonLoveSongLabelBottomLeftCoords } from "$stores/labels";
	import { showAggregateSnakeChart, typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";

	import { LOVE_SONG_TYPE_CONSTANTS, TEXT_SHADOW_COLOR_MAP } from "$data/data-constants";

	import NonLoveSongLabel from "./NonLoveSongLabel.svelte";
	import LoveSongTypeLabel from "./LoveSongTypeLabel.svelte";
	import { textShadow } from "$utils/styling";
	
    export let tweenedCoords;

	const DECADE_TO_PLACE_LABEL_IN = {
		[LOVE_SONG_TYPE_CONSTANTS.serenade]: 1970,
		[LOVE_SONG_TYPE_CONSTANTS.heartache]: 1970,
		[LOVE_SONG_TYPE_CONSTANTS.pursuit]: 1980,

		[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: 2000,
	}

	const LOVE_SONG_TYPE_TAB_ORDER = [
		LOVE_SONG_TYPE_CONSTANTS.serenade,
		LOVE_SONG_TYPE_CONSTANTS.heartache,
		LOVE_SONG_TYPE_CONSTANTS.pursuit,

		LOVE_SONG_TYPE_CONSTANTS.sexualConfidence,
		LOVE_SONG_TYPE_CONSTANTS.itsComplicated,
		LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf,
		LOVE_SONG_TYPE_CONSTANTS.goodRiddance,
	]	

	const getX = (x, orderInNonLoveSongStack, nonLoveSongX) => {
		if (orderInNonLoveSongStack !== -1) return nonLoveSongX;
		return $getXPositionForYear(x);
	}

	const OFFSET_FROM_NON_LOVE_SONG_LABEL = 0;
	const getY = (y0, orderInNonLoveSongStack, nonLoveSongY, labelHeight, loveSongType) => {
		if (orderInNonLoveSongStack !== -1) {
			return OFFSET_FROM_NON_LOVE_SONG_LABEL + nonLoveSongY + labelHeight * (2 + orderInNonLoveSongStack);
		}

		// Special case: on small screens, Love Song for the Self label is too close to Good Riddance without shifting one of them
		if ($isEndingSandboxStep && +loveSongType === +LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf && $viewport.isSmallish) {
			return $getYPositionForPercentage(y0) - 10;
		}
		
		return $getYPositionForPercentage(y0) - 3;
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
			const fontAdjustment = (wasJustSpotlighted && !$viewport.isSmallish ? 8 : 0) + ($viewport.isSmallish ? -4 : 0);
			const fontSize = baseFontSize + fontAdjustment;
			const labelHeight = fontSize * 2;
			return [... acc, {
				loveSongType,
				labelHeight,
				x: getX(x, orderInNonLoveSongStack, $nonLoveSongLabelBottomLeftCoords.x),
				y: getY(y0, orderInNonLoveSongStack, $nonLoveSongLabelBottomLeftCoords.y, labelHeight, loveSongType),
				translate: `translate(${isTreatedAsNonLoveSong ? -50 : 0}%, -80%)`,
				visibility: $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 'hidden' : 'visible',
				fontSize: `${fontSize}px`,
				fontWeight: wasJustSpotlighted ? "bold" : "normal",
				textShadow: textShadow(2, 2, TEXT_SHADOW_COLOR_MAP[loveSongType])
			}]
		}, [])
		// so tabindex order matches left to right, top to bottom visual reading order
		.sort((a, b) => {
			const indexA = LOVE_SONG_TYPE_TAB_ORDER.indexOf(a.loveSongType);
			const indexB = LOVE_SONG_TYPE_TAB_ORDER.indexOf(b.loveSongType);
			return indexA - indexB;
		}); 

	$: bubbleViewOnLastStep = $isEndingSandboxStep && !$showAggregateSnakeChart;
	$: show = $currentStoryStep.showXAxis && !$currentStoryStep.isFinalComparisonStep && !$aSingleLoveSongTypeIsSpotlighted && !bubbleViewOnLastStep;

	const ariaLabel = `Love song categories, click each to remove or add it from the love song categories.`;
</script>

{#if show}
	<NonLoveSongLabel />
	<ul aria-label={ariaLabel} aria-hidden={$isEndingSandboxStep ? "false" : "true"}>
		{#each labelMetadata as { loveSongType, x, y, translate, visibility, fontSize, fontWeight, textShadow }}
			<LoveSongTypeLabel {loveSongType} {x} {y} {translate} {visibility} {fontSize} {fontWeight} {textShadow} />
		{/each}
	</ul>
{/if}