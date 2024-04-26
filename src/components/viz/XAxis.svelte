<script>
    import * as d3 from 'd3'; 
    import viewport from "$stores/viewport.js";
    import { STORY_STEP_CONTROLLER_BOTTOM_PADDING } from './viz-utils';
    import { MAX_YEAR, MIN_YEAR } from '$data/songs-data';
	import { RIGHT_TOOLBAR_WIDTH, X_MARGIN } from '$data/data-utils';
    
    let gx;

    $: x = d3.scaleLinear([MIN_YEAR, MAX_YEAR], [X_MARGIN, $viewport.width - RIGHT_TOOLBAR_WIDTH - 2 * X_MARGIN]);
    $: d3.select(gx).call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(10).tickSizeOuter(0));
</script>

<svg width={$viewport.width} height={$viewport.height}>
    <g bind:this={gx} transform="translate(0, {$viewport.height - STORY_STEP_CONTROLLER_BOTTOM_PADDING})" />
</svg>

<style>
    svg {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
    }
</style>