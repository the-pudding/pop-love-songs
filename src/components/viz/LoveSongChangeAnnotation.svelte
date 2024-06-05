<script>
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { MIN_DATE } from "$data/songs-data";
    import { onlyShowOneDecimalPlaceIfLessThan10 } from "$data/data-utils";
    
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
        <div style:top={`${sixtiesYPos}px`}>60s: {onlyShowOneDecimalPlaceIfLessThan10(1 - sixtiesYScreenPercentage)}</div>

        <div style:top={`${modernYPos}px`} class="guideline"></div>
        <div style:top={`${modernYPos}px`}>now: {onlyShowOneDecimalPlaceIfLessThan10(1 - modernYScreenPercentage)}</div>
        
        <div style:top={`${changeTextPos}px`}>{$formattedLoveSongPercentChange}% change</div>
    
    </div>
{/if}

<style>
    div div {
        z-index: 100000;
        position: fixed;
        right: 20px;
    }

    div div.guideline {
        width: 100%;
        height: 1px;
        border-top: 1px dashed black;
    }
</style>