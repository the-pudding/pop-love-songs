<script>
    export let topPosition = 0;
    export let year = "";
    export let percentage = 0;
    export let isLeftSide = false;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${topPosition}px; ${isLeftSide ? "left: 50px;" : "right: 60px;"} text-align: ${isLeftSide ? "left" : "right"}`;
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
        /* pointer-events: none; */

        font-family: 'Atlas Grotesk', sans-serif;
    }
    .year, .love-songs {
        font-size: 16px;
        line-height: 16px;
    }

    .year, .percentage {
        font-weight: bold;
    }

    .percentage {
        font-size: 48px;
        line-height: 48px;
    }
</style>