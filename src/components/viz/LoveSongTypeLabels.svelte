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
		[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: 1970,
		[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: 1980,
		[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]: 2000,
		[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: 2000,
	}

	const getX = (x, orderInNonLoveSongStack, nonLoveSongX) => {
		if (orderInNonLoveSongStack !== -1) return nonLoveSongX;
		return $getXPositionForYear(x);
	}

	const OFFSET_FROM_NON_LOVE_SONG_LABEL = 0;
	const getY = (y0, orderInNonLoveSongStack, nonLoveSongY, labelHeight) => {
		if (orderInNonLoveSongStack !== -1) {
			return OFFSET_FROM_NON_LOVE_SONG_LABEL + nonLoveSongY + labelHeight * (2 + orderInNonLoveSongStack);
		}
		return $getYPositionForPercentage(y0);
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
			const fontSize = baseFontSize + fontAdjustment;
			const labelHeight = fontSize * 2;
			return [... acc, {
				loveSongType,
				labelHeight,
				x: getX(x, orderInNonLoveSongStack, $nonLoveSongLabelBottomLeftCoords.x),
				y: getY(y0, orderInNonLoveSongStack, $nonLoveSongLabelBottomLeftCoords.y, labelHeight),
				// TODO: if we decide to keep this cool flying transition and want it NOT wonky, then we need to either left align, or use elements width to directly add shift to left property
				translate: `translate(${isTreatedAsNonLoveSong ? -50 : 0}%, -80%)`,
				visibility: $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 'hidden' : 'visible',
				fontSize: `${fontSize}px`,
				fontWeight: wasJustSpotlighted ? "bold" : "normal",
				textShadow: textShadow(2, 2, TEXT_SHADOW_COLOR_MAP[loveSongType])
			}]
		}, []);

	$: bubbleViewOnLastStep = $isEndingSandboxStep && !$showAggregateSnakeChart;
	$: show = $currentStoryStep.showXAxis && !$currentStoryStep.isFinalComparisonStep && !$aSingleLoveSongTypeIsSpotlighted && !bubbleViewOnLastStep;
</script>

{#if show}
	<NonLoveSongLabel />
	{#each labelMetadata as { loveSongType, x, y, translate, visibility, fontSize, fontWeight, textShadow }}
		<LoveSongTypeLabel {loveSongType} {x} {y} {translate} {visibility} {fontSize} {fontWeight} {textShadow} />
	{/each}	
{/if}