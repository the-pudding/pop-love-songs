<script>
    import viewport from "$stores/viewport.js";
	import { Y_MARGIN_SCREEN_PERCENTAGE, abbreviateYear, getXPosForYear, xScaleJustAddRange } from '$data/data-utils';

    const X_YEARS = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
    
    let gx;

    const formatYear = year => `${abbreviateYear(year)}s`;
    $: x = xScaleJustAddRange($viewport.width)
    $: xPositions = X_YEARS.map(year => ({
        year,
        x: getXPosForYear(year, $viewport.width)
    }))
</script>

<div class="x-axis">
    {#each xPositions as { year, x }}
        <div class="tick" style="left: {x}px;">
            {formatYear(year)}
        </div>
    {/each}
</div>

<style>
    .x-axis {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30px;
        z-index: 1000;
        pointer-events: none;

        font-family: var(--sans);
        font-weight: bold;

        opacity: 0.3;
    }

    .tick {
        position: absolute;
        font-size: 16px;
    }
</style>