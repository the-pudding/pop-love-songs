<script>
	import {onDestroy} from "svelte";
	import {timeRange} from "$stores/searchAndFilter.js";
	import { MAX_YEAR, MIN_YEAR } from "$data/songs-data";

    let startYear = MIN_YEAR;
    let endYear = MAX_YEAR;
	
    // Stay in sync with store
	const unsubscribe = timeRange.subscribe(($timeRange) => {
		startYear = $timeRange.startYear;
        endYear = $timeRange.endYear;
	});

	// Keep store in sync
	$: timeRange.set({startYear, endYear});

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<div class="wrapper">
    <div>
        <label for="startYear">Start Year</label>
        <input type="number" id="startYear" bind:value={startYear} min={MIN_YEAR} max={MAX_YEAR} />
    </div>
    <div>
        <label for="endYear">End Year</label>
        <input type="number" id="endYear" bind:value={endYear} min={MIN_YEAR} max={MAX_YEAR} />
    </div>
</div>

<style>
    .wrapper {
        display: flex
    }
</style>

