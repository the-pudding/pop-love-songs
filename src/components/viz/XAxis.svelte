<script>
    import viewport from "$stores/viewport.js";
    import { abbreviateYear, getXPosForYear } from '$data/data-utils';
    import { aSingleLoveSongTypeIsSpotlighted } from "$stores/storySteps";

    $: tickYears = [1960, 1970, 1980, 1990, 2000, 2010, 2020]
        .filter(year => !$viewport.isMobileLandscapeWidth || year % 20 === 0);

    const formatYear = year => `${abbreviateYear(year)}s`;
    $: xPositions = tickYears.map(year => ({
        year,
        x: getXPosForYear(year, $viewport.width)
    }))
</script>

<div class="x-axis" >
    {#each xPositions as { year, x }}
        <div 
            class="dashed-line"
            style="left: {x}px;" 
            style:bottom={$aSingleLoveSongTypeIsSpotlighted ? "30%" : "0"}
            style:height={$aSingleLoveSongTypeIsSpotlighted ? "30%" : "0"}
        />
        <div 
            class="tick" 
            style="left: {x}px;" 
            style:bottom={$aSingleLoveSongTypeIsSpotlighted ? "30%" : "0"}
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
        transform: translateX(-50%);
    }

    .dashed-line {
        transform: translateY(-24px);
        width: 1px;
        border-left: 1px dashed black;

    }
</style>