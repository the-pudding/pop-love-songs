<script>
    import viewport from "$stores/viewport.js";
    import { abbreviateYear, getXPosForYear } from '$data/data-utils';
    import { aSingleLoveSongTypeIsSpotlighted } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";

    $: tickYears = [1960, 1970, 1980, 1990, 2000, 2010, 2020]
        .filter(year => !$viewport.isMobileLandscapeWidth || year % 20 === 0);

    const formatYear = year => `${abbreviateYear(year)}s`;
    $: xPositions = tickYears.map(year => ({
        year,
        x: getXPosForYear(year, $viewport.width)
    }))

    const CENTER_PERCENTAGE = 0.5;
    const OFFSET_PERCENTAGE = 0.1; 
    $: yCenter = getYPosForPercentage(CENTER_PERCENTAGE, $viewport.height);
    $: radiusOutFromCenter = Math.abs(yCenter - getYPosForPercentage(CENTER_PERCENTAGE - OFFSET_PERCENTAGE, $viewport.height));
    $: yBottom = getYPosForPercentage(1, $viewport.height) - yCenter - radiusOutFromCenter;
    $: yHeight = 4 * radiusOutFromCenter; // LOL I thought this should be 2 *, but it's 4 * for some reason
</script>

<div class="x-axis" >
    {#each xPositions as { year, x }}
        <div 
            class="dashed-line"
            style="left: {x}px;" 
            style:bottom={`${$aSingleLoveSongTypeIsSpotlighted ? yBottom : 0}px`}
            style:height={`${$aSingleLoveSongTypeIsSpotlighted ? yHeight : 0}px`}
        />
        <div 
            class="tick" 
            style="left: {x}px;" 
            style:bottom={`${$aSingleLoveSongTypeIsSpotlighted ? yBottom : "0"}px`}
        >
            {formatYear(year)}
        </div>
    {/each}
</div>

<style>
    .tick, .dashed-line {
        position: absolute;
        transition: bottom var(--chart_transition_opacity_duration) ease, height var(--chart_transition_opacity_duration) ease;
        z-index: 1000;
        pointer-events: none;

        font-family: var(--sans);
        font-weight: bold;

        opacity: 0.3;
    }

    .tick {
        font-size: 16px;
        max-height: 24px;
        /* Center text */
        transform: translateX(-50%) translateY(-0px);
    }

    .dashed-line {
        transform: translateY(-24px);
        width: 1px;
        border-left: 1px dashed black;

    }
</style>