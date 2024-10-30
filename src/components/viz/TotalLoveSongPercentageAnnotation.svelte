<script>
	import viewport from "$stores/viewport";
    import { margins } from "$stores/canvasPosition";
    import { loveSongDecadeChangeAriaLabel } from "$data/data-utils";

    export let topPosition = 0;
    export let decade = "";
    export let percentage = 0;
    export let isLeftSide = false;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${topPosition}px; ${isLeftSide ? `left: ${$margins.left}px;` : `right: ${$margins.right}px;`} text-align: ${isLeftSide ? "left" : "right"}; font-size: ${$viewport.isLikelyInMobileLandscape ? '40px' : '56px'}`;
</script>

<li class="container" style={style} aria-label={loveSongDecadeChangeAriaLabel(decade, percentage)}>
    <span aria-hidden="true">{percentage}%</span>
</li>   

<style>
    .container {
        position: fixed;
        transform: translateY(-100%);

        font-family: 'Atlas Grotesk', sans-serif;
        font-weight: bold;

        list-style-type: none;
    }
</style>
