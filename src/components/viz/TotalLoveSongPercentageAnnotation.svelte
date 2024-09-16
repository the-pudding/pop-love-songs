<script>
	import viewport from "$stores/viewport";

    export let topPosition = 0;
    export let year = "";
    export let percentage = 0;
    export let isLeftSide = false;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${topPosition}px; ${isLeftSide ? "left: 50px;" : "right: 60px;"} text-align: ${isLeftSide ? "left" : "right"}; font-size: ${$viewport.isLikelyInMobileLandscape ? '40px' : '56px'}`;
</script>

<div class="container" style={style} aria-label={`In ${year}, love songs made up ${percentage}% of all songs.`}>
    {percentage}%
</div>   

<style>
    .container {
        position: fixed;
        transform: translateY(-100%);

        z-index: 100000;
        font-family: 'Atlas Grotesk', sans-serif;
        font-weight: bold;
    }
</style>
