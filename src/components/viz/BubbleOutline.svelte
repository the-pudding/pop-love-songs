<script>
	import { BUBBLE_BORDER_THICKNESS } from "./viz-utils";

    export let circleX;
    export let circleY;
    export let circleRadius;
    export let color = "black";

    $: radius = circleRadius + BUBBLE_BORDER_THICKNESS;
</script>

<div
    class="circle-outline"
    style={`top: ${circleY}px; left: ${circleX}px; height: ${radius * 2}px; width: ${radius * 2}px; border: ${BUBBLE_BORDER_THICKNESS}px solid ${color};`}
/>

<style>
    .circle-outline {
		z-index: 10000;
		position: absolute;
		border-radius: 100%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}
</style>