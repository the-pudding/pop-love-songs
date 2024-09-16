<script>
	import { currentStoryStep } from "$stores/storySteps";
	import viewport from "$stores/viewport";

    export let x = 0;
    export let y = 0;
    export let decade = "";
    export let percentage = 0;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${y}px; left: ${x}px;`;
</script>

{#if !$viewport.isLikelyInMobileLandscape && !$currentStoryStep.isFinalComparisonStep}
    <div class="container" style={style} aria-label={`In the ${`${decade}s`}, love songs made up ${percentage}% of all songs.`}>
        {percentage}%
    </div>   
{/if}

<style>
    .container {
        position: fixed;
        transform: translateY(-100%) translateX(-50%);

        z-index: 100000;
        font-family: 'Atlas Grotesk', sans-serif;
        font-weight: bold;
        font-size: 16px;
    }
</style>