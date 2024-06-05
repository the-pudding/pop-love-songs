<script>
	import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
	import { MAX_YEAR, MIN_YEAR } from "$data/songs-data";
    import { onlyShowOneDecimalPlaceIfLessThan10 } from "$data/data-utils";
    
    import viewport from "$stores/viewport";
    import { currentStoryStep } from "$stores/storySteps";
	import { getYPosForPercentage } from "$stores/forcePositionOptions-helper";
	
    export let tweenedCoords;

    // TODO: move this to original file, rename original variables to MIN/MAX_DATE (since they are NOT rounded to years)
    const _MIN_YEAR = Math.floor(MIN_YEAR)
    const _MAX_YEAR = Math.floor(MAX_YEAR)
    $: sixtiesYScreenPercentage = tweenedCoords && tweenedCoords.find(({loveSongType}) => +loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === _MIN_YEAR).y0
    $: sixtiesYPos = getYPosForPercentage(sixtiesYScreenPercentage, $viewport.height)
    // $: modernYScreenPercentage = tweenedCoords && tweenedCoords.find(({loveSongType}) => loveSongType === LOVE_SONG_TYPE_CONSTANTS.notALoveSong).svgCoords.find(({x}) => x === _MAX_YEAR).y0
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