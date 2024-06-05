<script>
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import {  MIN_DATE, MAX_DATE } from "$data/songs-data";
    import { onlyShowOneDecimalPlaceIfLessThan10 } from "$data/data-utils";
    
    import viewport from "$stores/viewport";
    import { currentStoryStep } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	
    export let tweenedCoords;

    $: sixtiesYScreenPercentage = tweenedCoords && tweenedCoords.find(({loveSongType}) => +loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === MIN_DATE).y0
    $: sixtiesYPos = getYPosForPercentage(sixtiesYScreenPercentage, $viewport.height)
    // $: modernYScreenPercentage = tweenedCoords && tweenedCoords.find(({loveSongType}) => loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === MAX_DATE).y0
</script>

{#if $currentStoryStep.showLoveSongChange}
    <div>
        <div style:top={`${sixtiesYPos}px`}>60s: {onlyShowOneDecimalPlaceIfLessThan10(sixtiesYScreenPercentage)}</div>
        <!-- <div style:top={`${sixtiesYPos}px`}>now: {onlyShowOneDecimalPlaceIfLessThan10(sixtiesYScreenPercentage)}</div> -->
        <!-- <div>[% change]</div>
        <div>now</div> -->
    </div>
{/if}

<style>
    div div {
        z-index: 100000;
        position: fixed;
        right: 20px;
    }
</style>