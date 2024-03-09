<script>
    import { derived } from 'svelte/store';
    import {percentageOfLoveSongsCurrentlySelected, percentageOfLoveSongsDuring1959To1969, percentageOfLoveSongsDuringLast10YearsOfSelection} from '$stores/dataDerivations'   
	import { onlyShowOneDecimalPlaceIfLessThan10 } from '$data/data-utils';

    const changeFrom60sToLast10Years = derived(
        [percentageOfLoveSongsDuring1959To1969, percentageOfLoveSongsDuringLast10YearsOfSelection],
        ([$percentageOfLoveSongsDuring1959To1969, $percentageOfLoveSongsDuringLast10YearsOfSelection]) => {
            return $percentageOfLoveSongsDuring1959To1969 - $percentageOfLoveSongsDuringLast10YearsOfSelection;
        }
    );
    $: formattedChange = ($changeFrom60sToLast10Years > 0 ? '+' : '') + onlyShowOneDecimalPlaceIfLessThan10(Math.abs($changeFrom60sToLast10Years));
    // Calculate the color of the text based on the change: red for negative, green for positive, gray for 3 percent or less
    $: textColor = $changeFrom60sToLast10Years > 3 ? 'green' : $changeFrom60sToLast10Years < -3 ? 'red' : 'gray';
</script>

<div>
    <p>Love song <b>popularity change</b>, 60s vs last 10 of selection:</p>
    <h5 style="color: {textColor}">{formattedChange}</h5>
</div>