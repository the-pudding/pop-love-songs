<script>
    import viewport from "$stores/viewport.js";
    import { abbreviateYearForDisplay, Y_MARGIN_SCREEN_PERCENTAGE } from '$data/data-utils';
    import { aSingleLoveSongTypeIsSpotlighted } from "$stores/storySteps";
	import { getXPositionForYear, getYPositionForPercentage } from "$stores/canvasPosition";
	import { textShadow } from "$utils/styling";

    $: tickYears = [1960, 1970, 1980, 1990, 2000, 2010, 2020]
        .filter(year => !$viewport.isLikelyInMobileLandscape || year % 20 === 0);

    const formatYear = year => `${abbreviateYearForDisplay(year)}s`;
    $: xPositions = tickYears.map(year => ({
        year,
        x: $getXPositionForYear(year)
    }))

    // Calculations for when a single love song type is spotlighted
    const CENTER_PERCENTAGE = 0.5;
    const OFFSET_PERCENTAGE = 0.23; // got it juuust right :)
    $: yCenter = $getYPositionForPercentage(CENTER_PERCENTAGE);
    $: yBottomOfDashedLine = $getYPositionForPercentage(CENTER_PERCENTAGE + OFFSET_PERCENTAGE);
    $: radiusOutFromCenter = Math.abs(yCenter - yBottomOfDashedLine);
    $: yHeight = 2 * radiusOutFromCenter;
    $: topOfDashedLine = yCenter - radiusOutFromCenter;

    // Where to place axis during normal, snake chart view
    $: belowSnakeChart = $viewport.height - (Y_MARGIN_SCREEN_PERCENTAGE * $viewport.height);
</script>

 {#each xPositions as { year, x }}
        <div 
            class="dashed-line"
            style="left: {x}px;" 
            style:top={`${$aSingleLoveSongTypeIsSpotlighted ? topOfDashedLine : belowSnakeChart}px`}
            style:height={`${$aSingleLoveSongTypeIsSpotlighted ? yHeight : 0}px`}
        />
        <div 
            class="tick" 
            style="left: {x}px;" 
            style:top={`${$aSingleLoveSongTypeIsSpotlighted ? yBottomOfDashedLine : belowSnakeChart}px`}
            style:text-shadow={textShadow(1, 1)}
            style:font-size={$viewport.isLikelyInMobileLandscape ? '12px' : '16px'}
        >
            {formatYear(year)}
        </div>
{/each}

<style>
    .tick, .dashed-line {
        position: fixed;
        transition: top calc(var(--chart-transition-opacity-duration) * 1ms) ease, height calc(var(--chart-transition-opacity-duration) * 1ms) ease;
        z-index: 1000;
        pointer-events: none;

        font-family: var(--sans);
        font-weight: bold;

        pointer-events: none;
    }

    .tick {
        font-size: 16px;
        max-height: 24px;
        /* Center text */
        transform: translateX(-50%) translateY(-0px);
    }

    .dashed-line {
        width: 1px;
        border-left: 1px dashed black;
        opacity: 0.2;
        z-index: 0;
    }
</style>