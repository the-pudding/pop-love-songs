<script>
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { MIN_DATE } from "$data/songs-data";
    import { onlyShowOneDecimalPlaceIfLessThan10 } from "$data/data-utils";
    
    import viewport from "$stores/viewport";
    import { currentStoryStep } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
    import { showAggregateSnakeChart } from "$stores/searchAndFilter";

	import TotalLoveSongPercentageAnnotation from "./TotalLoveSongPercentageAnnotation.svelte";
	
    export let tweenedCoords;

    $: sixtiesYScreenPercentage = tweenedCoords.find(({loveSongType}) => +loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === MIN_DATE).y0
    $: sixtiesYPos = getYPosForPercentage(sixtiesYScreenPercentage, $viewport.height)
    
    // TODO: (bug?) the max value of the tweenedCoords does not === MAX_DATE... why? Is this a mistake in how we're laying out the coords?
    $: modernYScreenPercentage = tweenedCoords.find(({loveSongType}) => loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.at(-1).y0
    $: modernYPos = getYPosForPercentage(modernYScreenPercentage, $viewport.height)
</script>

{#if $currentStoryStep.showLoveSongChange && $showAggregateSnakeChart}
    <div>

       <TotalLoveSongPercentageAnnotation topPosition={sixtiesYPos} year="1960s" percentage={onlyShowOneDecimalPlaceIfLessThan10(100 * (1 - sixtiesYScreenPercentage))} isLeftSide={true} />
       <TotalLoveSongPercentageAnnotation topPosition={modernYPos} year="2020s" percentage={onlyShowOneDecimalPlaceIfLessThan10(100 * (1 - modernYScreenPercentage))} />
    </div>
{/if}

<style>
    
</style>