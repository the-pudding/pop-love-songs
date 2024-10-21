<script>
    import { displayLoveSongPercentage, getModernYScreenPercentage, getSixtiesYScreenPercentage, onlyShowOneDecimalPlaceIfLessThan10 } from "$data/data-utils";
    
    import { currentStoryStep } from "$stores/storySteps";
    import { getXPositionForYear, getYPositionForPercentage } from "$stores/canvasPosition";
    import { showAggregateSnakeChart } from "$stores/searchAndFilter";

	import TotalLoveSongPercentageAnnotation from "./TotalLoveSongPercentageAnnotation.svelte";
	import { svgCoordsForSnakeChartOutline } from "$stores/snakeChartOutlineGenerator";
	import LoveSongChangeTinyAnnotation from "./LoveSongChangeTinyAnnotation.svelte";
	
	
    export let tweenedCoords;

    $: sixtiesYScreenPercentage = getSixtiesYScreenPercentage(tweenedCoords)
    $: sixtiesYPos = $getYPositionForPercentage(sixtiesYScreenPercentage)
    
    $: modernYScreenPercentage = getModernYScreenPercentage(tweenedCoords)
    $: modernYPos = $getYPositionForPercentage(modernYScreenPercentage)

    // From svgCoordsForSnakeChartOutline, for each y1's
    const SMALL_LABEL_DECADES = [1970, 1980, 1990, 2000, 2010]
    $: smallLabelYPos = SMALL_LABEL_DECADES.map((decade, index) => {
        // reduce to get the average of the y1's for all the x's in that decade
        const coordsAveragedByDecade = $svgCoordsForSnakeChartOutline.reduce(
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
            y: $getYPositionForPercentage(coordsAveragedByDecade.y / 2),
            x: $getXPositionForYear(coordsAveragedByDecade.x / 2),
            decade
        }
    })

    $: ariaLabel = "Percentage of love song in the Billboard Top 10, by decade"
</script>

{#if $currentStoryStep.showLoveSongChange && $showAggregateSnakeChart}
    <ol aria-label={ariaLabel}>
       <TotalLoveSongPercentageAnnotation topPosition={sixtiesYPos} decade="1960" percentage={displayLoveSongPercentage(sixtiesYScreenPercentage)} isLeftSide={true} />
        {#each smallLabelYPos as {x, y, decade}}
            <LoveSongChangeTinyAnnotation {y} {x} {decade} percentage={onlyShowOneDecimalPlaceIfLessThan10(100 * (1 - $svgCoordsForSnakeChartOutline.find(({x}) => x === decade).y1))}/>
        {/each}
       <TotalLoveSongPercentageAnnotation topPosition={modernYPos} decade="2020" percentage={displayLoveSongPercentage(modernYScreenPercentage)} />
    </ol>
{/if}