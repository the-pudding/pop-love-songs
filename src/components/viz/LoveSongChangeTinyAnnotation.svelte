<script>
	import viewport from "$stores/viewport";

    export let x = 0;
    export let y = 0;
    export let year = "";
    export let percentage = 0;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${y}px; left: ${x}px;`;
</script>

{#if !$viewport.isLikelyInMobileLandscape}
    <div class="container" style={style} aria-label={`In ${year}, love songs made up ${percentage}% of all songs.`}>
        <div class="percentage">{percentage}%</div>
    </div>   
{/if}

<style>
    .container {
        position: fixed;
        transform: translateY(-100%);

        z-index: 100000;
        font-family: 'Atlas Grotesk', sans-serif;
    }

    .percentage {
        font-weight: bold;
        font-size: 16px;
    }
</style>