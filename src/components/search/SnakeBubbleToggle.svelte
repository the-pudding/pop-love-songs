<script>
	import {onDestroy} from "svelte";
	import Toggle from "$components/helpers/Toggle.svelte";

	import { selectedPerformers, selectedSongs, showAggregateSnakeChart } from "$stores/searchAndFilter.js";

	const CHART_OPTIONS = {
		snake: 'show aggregate',
		bubble: 'show individual songs'
	}

	let localValue;

	// Subscribe to the selectedSongs store, update the local variable when it changes
	const unsubscribe = showAggregateSnakeChart.subscribe(($showAggregateSnakeChart) => {
		localValue = $showAggregateSnakeChart? CHART_OPTIONS.snake : CHART_OPTIONS.bubble;
	});

	const handleToggle = ({value}) => {
		localValue = value;
		showAggregateSnakeChart.set(localValue === CHART_OPTIONS.snake);

		if (localValue === CHART_OPTIONS.snake) {
			selectedSongs.set([]);
			selectedPerformers.set([]);
		}
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<Toggle label="switch between aggregate and individual song view" style="inner" options={Object.values(CHART_OPTIONS)} value={localValue} onToggle={handleToggle} />
