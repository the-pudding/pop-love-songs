<script>
	import {onDestroy} from "svelte";
	import {timeRange} from "$stores/searchAndFilter.js";
	import { MAX_DATE, MIN_DATE } from "$data/songs-data";

    let startYear = MIN_DATE;
    let endYear = MAX_DATE;
	
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
        <input type="number" id="startYear" bind:value={startYear} min={MIN_DATE} max={MAX_DATE} />
    </div>
    <div>
        <label for="endYear">End Year</label>
        <input type="number" id="endYear" bind:value={endYear} min={MIN_DATE} max={MAX_DATE} />
    </div>
</div>

<style>
    .wrapper {
        display: flex
    }
</style>

