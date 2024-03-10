<script>
    import { derived } from 'svelte/store';
    import {percentageOfLoveSongsCurrentlySelected, percentageOfLoveSongsDuring1959To1969, percentageOfLoveSongsDuringLast10YearsOfSelection, maxYearFromSelectedSongs} from '$stores/dataDerivations'   
	import { onlyShowOneDecimalPlaceIfLessThan10 } from '$data/data-utils';

    const changeFrom60sToLast10Years = derived(
        [percentageOfLoveSongsDuring1959To1969, percentageOfLoveSongsDuringLast10YearsOfSelection],
        ([$percentageOfLoveSongsDuring1959To1969, $percentageOfLoveSongsDuringLast10YearsOfSelection]) => {
            return  $percentageOfLoveSongsDuringLast10YearsOfSelection - $percentageOfLoveSongsDuring1959To1969;
        }
    );
    const formattedChange = derived(
        changeFrom60sToLast10Years,
        ($changeFrom60sToLast10Years) => {
            return `${$changeFrom60sToLast10Years > 0 ? '+' : $changeFrom60sToLast10Years < 0 ? '-' : ''}${onlyShowOneDecimalPlaceIfLessThan10(Math.abs($changeFrom60sToLast10Years))}`;
        }
    );
    // Calculate the color of the text based on the change: red for negative, green for positive, gray for 3 percent or less
    $: textColor = $changeFrom60sToLast10Years > 3 ? 'green' : $changeFrom60sToLast10Years < -3 ? 'red' : 'gray';
</script>

<div>
    <p style="font-style: italic">Love song popularity from <b>{Math.round($maxYearFromSelectedSongs) - 10} to {Math.round($maxYearFromSelectedSongs)}</b> VS during the 60s:</p>

    <p><b>{$percentageOfLoveSongsDuringLast10YearsOfSelection.toFixed(1)}%</b> - {$percentageOfLoveSongsDuring1959To1969.toFixed(1)}% =</p>
    <h2 style:color={textColor}>{$formattedChange}% change</h2>
    
    <p style="font-size: 10px;">(For context: on avg love songs are {$percentageOfLoveSongsCurrentlySelected.toFixed(1)}% accross entire current selection)</p>
</div>

<!-- Give the p-tags less margin/padding bottom -->
<style>
    p {
        margin: 2px;
    }

    h2 {
        margin-top: 0;
    }
</style>