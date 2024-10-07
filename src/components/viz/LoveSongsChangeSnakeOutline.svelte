<script>
	import viewport from "$stores/viewport";

    export let d;

    $: strokeWidth = $viewport.isLikelyInMobileLandscape ? 2 : 4;
</script>

<path {d} fill="none" stroke="black" stroke-width={strokeWidth} stroke-dasharray={2 * strokeWidth} />