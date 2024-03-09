<script>
    import {percentageOfLoveSongsCurrentlySelected, percentageOfLoveSongsDuring1959To1969, percentageOfLoveSongsDuringLast10YearsOfSelection} from '$stores/dataDerivations'
    
</script>

<div>
    <p>Love song %:</p>
    <p>Full selection: {$percentageOfLoveSongsCurrentlySelected}</p>
    <p>60s: {$percentageOfLoveSongsDuring1959To1969}</p>
    <p>Last 10 years of selection: {$percentageOfLoveSongsDuringLast10YearsOfSelection}</p>
</div>