<script>
	import {onDestroy} from "svelte";
	import Toggle from "$components/helpers/Toggle.svelte";

	import { showAggregateSnakeChart } from "$stores/searchAndFilter.js";

	const CHART_OPTIONS = {
		snake: 'snake chart',
		bubble: 'bubble chart'
	}

	let localValue;

	// Subscribe to the selectedSongs store, update the local variable when it changes
	const unsubscribe = showAggregateSnakeChart.subscribe(($showAggregateSnakeChart) => {
		localValue = $showAggregateSnakeChart? CHART_OPTIONS.snake : CHART_OPTIONS.bubble;
	});

	// Watch for changes in the userSelectedSongs and update the store
	$: {
		showAggregateSnakeChart.set(localValue === CHART_OPTIONS.snake);
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<Toggle label="Enable" style="inner" options={Object.values(CHART_OPTIONS)} bind:value={localValue} />
