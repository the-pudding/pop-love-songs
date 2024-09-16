<script>
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { MIN_DATE } from "$data/songs-data";
    import { onlyShowOneDecimalPlaceIfLessThan10 } from "$data/data-utils";
    
    import viewport from "$stores/viewport";
    import { currentStoryStep } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
    import { showAggregateSnakeChart } from "$stores/searchAndFilter";

	import TotalLoveSongPercentageAnnotation from "./TotalLoveSongPercentageAnnotation.svelte";
	import { svgCoordsForSnakeChartOutline } from "$stores/snakeChartOutlineGenerator";
	import LoveSongChangeTinyAnnotation from "./LoveSongChangeTinyAnnotation.svelte";
	
    export let tweenedCoords;

    $: sixtiesYScreenPercentage = tweenedCoords.find(({loveSongType}) => +loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === MIN_DATE).y0
    $: sixtiesYPos = getYPosForPercentage(sixtiesYScreenPercentage, $viewport.height)
    
    $: modernYScreenPercentage = tweenedCoords.find(({loveSongType}) => loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.at(-1).y0
    $: modernYPos = getYPosForPercentage(modernYScreenPercentage, $viewport.height)

    // From svgCoordsForSnakeChartOutline, for each y1's
    $: console.log({$svgCoordsForSnakeChartOutline})
    const SMALL_LABEL_DECADES = [1970, 1980, 1990, 2000, 2010]
    $: smallLabelYPos = SMALL_LABEL_DECADES.map((decade, index) => {
        // reduce to get the average of the y1's for all the x's in that decade
        const screenPercentage = $svgCoordsForSnakeChartOutline.reduce(
            (acc, {x, y1}) => {
                if (decade <= x && x < decade + 10) {
                    acc.y += y1,
                    acc.x += x
                }
                return acc
            }, 
            {y: 0, x: 0}
        )
        return {
            y: getYPosForPercentage(screenPercentage.y / 2, $viewport.height),
            x: 400,
            decade
        }
    })
    $: console.log({smallLabelYPos})
</script>

{#if $currentStoryStep.showLoveSongChange && $showAggregateSnakeChart}
    <div>
       <TotalLoveSongPercentageAnnotation topPosition={sixtiesYPos} year="1960s" percentage={onlyShowOneDecimalPlaceIfLessThan10(100 * (1 - sixtiesYScreenPercentage))} isLeftSide={true} />
        {#each smallLabelYPos as {x, y, decade}, i}
            <LoveSongChangeTinyAnnotation {y} {x} year={`${decade}s`} percentage={onlyShowOneDecimalPlaceIfLessThan10(100 * (1 - $svgCoordsForSnakeChartOutline.find(({x}) => x === decade).y1))}/>
        {/each}
       <TotalLoveSongPercentageAnnotation topPosition={modernYPos} year="2020s" percentage={onlyShowOneDecimalPlaceIfLessThan10(100 * (1 - modernYScreenPercentage))} />
    </div>
{/if}

<style>
    
</style>