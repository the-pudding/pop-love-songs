<script>
	import { getXPosForYear } from "$data/data-utils";
	import { MAX_DATE, MIN_DATE } from "$data/songs-data";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
    import viewport from "$stores/viewport";

    const midDate = MIN_DATE + (MAX_DATE - MIN_DATE) / 2;
    $: x = getXPosForYear(midDate, $viewport.width);
    const Y_PADDING = 0.04;
    $: y = getYPosForPercentage(0 + Y_PADDING, $viewport.height);
    $: fontSize = $viewport.isLikelyInMobileLandscape ? 12 : 16;

    $: style = `left: ${x}px; top: ${y}px; font-size: ${fontSize}px;`
</script>

<div class='container' {style}>
    NON-LOVE SONGS
</div>

<style>
    .container {
        position: fixed;
        transform: translateX(-50%);

        font-family: 'Inter', sans-serif;
        font-weight: 600;
        color: gray;
        letter-spacing: 6px;
    }
</style>