<script>
	export let topPosition = 0;
    export let year = "";
    export let percentage = 0;
    export let isLeftSide = false;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${topPosition}px; ${isLeftSide ? "left: 50px;" : "right: 50px;"}`;
</script>

<div class="container" style={style}>
    <div class="year">{year}</div>
    <div class="percentage">{percentage}%</div>
    <div class="love-songs">love songs</div>
</div>   

<style>
    .container {
        z-index: 100000;
        position: fixed;
        right: 20px;
        /* pointer-events: none; */

        font-family: 'Atlas Grotesk', sans-serif;
    }
    .year, .love-songs {
        font-size: 12px;
    }

    .year, .percentage {
        font-weight: bold;
    }

    .percentage {
        font-size: 24px;
    }
</style>