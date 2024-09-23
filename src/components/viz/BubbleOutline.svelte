<script>
	import { BUBBLE_BORDER_THICKNESS } from "./viz-utils";

    export let circleX;
    export let circleY;
    export let circleRadius;
    export let color = "black";
</script>

<div
    class="circle-outline"
    style={`top: ${circleY}px; left: ${circleX}px; height: ${circleRadius * 2}px; width: ${circleRadius * 2}px; border: ${BUBBLE_BORDER_THICKNESS}px solid ${color};`}
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