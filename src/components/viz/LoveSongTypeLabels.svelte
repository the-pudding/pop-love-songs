<script>
	import viewport from "$stores/viewport";
	import { getYPosForPercentage, TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE } from "$stores/forcePositionOptions-helper";
	import { aSingleLoveSongTypeIsSpotlighted, currentStoryStep, precedingStepSpotlightedType } from "$stores/storySteps";

	import { getXPosForYear } from "$data/data-utils";
	import { LOVE_SONG_TYPE_CONSTANTS, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP } from "$data/data-constants";

	import NonLoveSongLabel from "./NonLoveSongLabel.svelte";
	import LoveSongTypeCategoryButtons from "./LoveSongTypeCategoryButtons.svelte";

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

	const getX = (x, width) => {
		return getXPosForYear(x, width);
	}
	const getY = (y0, y1, loveSongType, height) => {
		return getYPosForPercentage(y0, height) - TOP_MARGIN_ON_EACH_SNAKE_PERCENTAGE * height / 2;
	}

	const findPoint = ({svgCoords, loveSongType}) => {
		const decade = DECADE_TO_PLACE_LABEL_IN[loveSongType];
		return svgCoords.find(({x}) => x === decade);
	}

	const MIN_Y_HEIGHT_TO_FIT_LABEL = 0.04;
	$: labelMetadata = tweenedCoords
		.filter(({loveSongType}) => loveSongType !== LOVE_SONG_TYPE_CONSTANTS.notALoveSong && !$currentStoryStep.searchAndFilterState.typesTreatedAsNonLoveSongs.includes(loveSongType))
		.reduce((acc, { loveSongType, svgCoords }) => {
			const {x, y0, y1} = findPoint({svgCoords, loveSongType}) || {};
			if (!x) return acc;
			const baseFontSize = (y0 - y1) < 2 * MIN_Y_HEIGHT_TO_FIT_LABEL ? 12 : 16;
			const wasJustSpotlighted = $precedingStepSpotlightedType === loveSongType;
			return [... acc, {
				loveSongType,
				x: getX(x, $viewport.width),
				y: getY(y0, y1, loveSongType, $viewport.height),
				opacity: $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(loveSongType) ? 0 : 1,
				fontSize: `${baseFontSize + (wasJustSpotlighted ? 8 : 0)}px`,
				fontWeight: wasJustSpotlighted ? "bold" : "normal"
			}]
		}, []);

	$: show = $currentStoryStep.showXAxis && !$currentStoryStep.isFinalComparisonStep && !$aSingleLoveSongTypeIsSpotlighted;
</script>

{#if show}
	<NonLoveSongLabel />
	{#each labelMetadata as { loveSongType, x, y, opacity, fontSize, fontWeight }}
		<div
			class={$currentStoryStep.allowUserToChangeFilters ? '' : 'no-pointer-events' }
			style:left={`${x}px`} style:top={`${y}px`}
			fill="black" 
			style:opacity={opacity}
			style:font-size={fontSize}
			style:font-weight={fontWeight}
		>
			{LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[loveSongType]}
			<LoveSongTypeCategoryButtons loveSongType={loveSongType} />
		</div>
	{/each}	
{/if}

<style>
    div {
		font-family: 'Atlas Grotesk', sans-serif;
		position: fixed;
		transform: translateY(-100%)
	}

	div.no-pointer-events {
		pointer-events: none;
	}
</style>