<script>
	import viewport from "$stores/viewport";
    import { margins } from "$stores/canvasPosition";
    import { loveSongDecadeChangeAriaLabel } from "$data/data-utils";

    export let topPosition = 0;
    export let decade = "";
    export let percentage = 0;
    export let isLeftSide = false;

    // I have no idea why the .012 is necessary, but it is :)
    $: style = `top: ${topPosition}px; ${isLeftSide ? `left: ${$margins.left}px;` : `right: ${$margins.right + $viewport.width * 0.012}px;`} text-align: ${isLeftSide ? "left" : "right"}; font-size: ${$viewport.isSmallish ? '40px' : '56px'}`;
</script>

<li class="container" style={style} aria-label={loveSongDecadeChangeAriaLabel(decade, percentage)}>
    <span aria-hidden="true">{percentage}%</span>
</li>   

<style>
    .container {
        position: fixed;
        transform: translateY(-100%);

        font-family: var(--sans);
        font-weight: bold;

        list-style-type: none;
    }
</style>
