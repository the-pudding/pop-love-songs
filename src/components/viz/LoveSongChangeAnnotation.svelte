<script>
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { MIN_DATE } from "$data/songs-data";
    
    import viewport from "$stores/viewport";
    import { currentStoryStep } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	import { formattedLoveSongPercentChange } from "$stores/dataDerivations";
	
    export let tweenedCoords;

    $: sixtiesYScreenPercentage = tweenedCoords.find(({loveSongType}) => +loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === MIN_DATE).y0
    $: sixtiesYPos = getYPosForPercentage(sixtiesYScreenPercentage, $viewport.height)
    
    // TODO: (bug?) the max value of the tweenedCoords does not === MAX_DATE... why? Is this a mistake in how we're laying out the coords?
    $: modernYScreenPercentage = tweenedCoords.find(({loveSongType}) => loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.at(-1).y0
    $: modernYPos = getYPosForPercentage(modernYScreenPercentage, $viewport.height)

    $: changeTextPos = (sixtiesYPos + modernYPos) / 2
</script>

{#if $currentStoryStep.showLoveSongChange}
    <div>
        <div style:top={`${sixtiesYPos}px`} class="guideline"></div>
        <div style:top={`${sixtiesYPos}px`} class="baseline-text">60s</div>

        <div style:top={`${modernYPos}px`} class="guideline"></div>
        <div style:top={`${modernYPos}px`}>now</div>
        
        <div style:top={`${changeTextPos}px`} class="change">{$formattedLoveSongPercentChange}% change</div>
    
    </div>
{/if}

<style>
    div div {
        z-index: 100000;
        position: fixed;
        right: 20px;
        pointer-events: none;

        font-family: 'Atlas Grotesk', sans-serif;
    }

    div div.baseline-text {
        top: 50%;
        transform: translateY(-100%);
        display: flex;
        align-items: baseline;
    }

    div div.guideline {
        width: 100%;
        height: 1px;
        border-top: 1px dashed black;
    }

    div .change {
        margin-right: 24px;

        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: baseline;
        font-weight: bold;
        font-size: 24px;
    }
</style>