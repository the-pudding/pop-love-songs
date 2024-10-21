<script>
	import { currentStoryStep } from "$stores/storySteps";
	import viewport from "$stores/viewport";
    import { loveSongDecadeChangeAriaLabel } from "$data/data-utils";

    export let x = 0;
    export let y = 0;
    export let decade = "";
    export let percentage = 0;

    // TODO: decide left/right margins more intelligently
    $: style = `top: ${y}px; left: ${x}px;`;
</script>

{#if !$viewport.isLikelyInMobileLandscape && !$currentStoryStep.isFinalComparisonStep}
    <li class="container" style={style} aria-label={loveSongDecadeChangeAriaLabel(decade, percentage)}>
        <span aria-hidden="true">{percentage}%</span>
    </li>   
{/if}

<style>
    .container {
        position: fixed;
        transform: translateY(-100%) translateX(-50%);

        font-family: 'Atlas Grotesk', sans-serif;
        font-size: 12px;

        list-style-type: none;
    }
</style>