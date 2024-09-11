<script>
    import * as d3 from 'd3'; // TODO: can we import only the necessary functions?
    import viewport from "$stores/viewport.js";
	import { Y_MARGIN_SCREEN_PERCENTAGE, abbreviateYear, xScaleJustAddRange } from '$data/data-utils';
    
    let gx;

    const formatYear = year => `${abbreviateYear(year)}s`;
    $: x = xScaleJustAddRange($viewport.width)
    $: d3.select(gx).call(d3.axisBottom(x).tickFormat(formatYear).ticks(5).tickSize(0))
        // .style("font-family", "Atlas Grotesk")
        .style("font-weight", "bold")
        .style("font-size", "16px")
</script>

<svg width={$viewport.width} height={$viewport.height}>
    <g bind:this={gx} transform="translate(0, {$viewport.height - ($viewport.height * Y_MARGIN_SCREEN_PERCENTAGE)})" />
</svg>

<style>
    svg {
        font-family: var(--sans);
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
    }
</style>