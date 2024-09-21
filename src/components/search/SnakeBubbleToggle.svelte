<script>
	import {onDestroy} from "svelte";
	import Toggle from "$components/helpers/Toggle.svelte";

	import { performerSearchString, selectedPerformers, selectedSongs, showAggregateSnakeChart, songSearchString } from "$stores/searchAndFilter.js";
	import { isLastStep } from "$stores/storySteps";

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
			songSearchString.set("");
			selectedSongs.set([]);
			performerSearchString.set("");
			selectedPerformers.set([]);		
		}
	}

	// For the final step, if there are search strings or selected search values, we need to be sure we've toggled to individual songs chart
	// @michelle Is this a random place to put this? Like should this be a derived store or something? What's tricking is that others are writing to showAggregateSnakeChart, too.
	$: {
		if ($isLastStep && $showAggregateSnakeChart) {
			if ($performerSearchString || $songSearchString || $selectedPerformers.length || $selectedSongs.length) {
				showAggregateSnakeChart.set(false);
			}
		}
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<Toggle label="switch between aggregate and individual song view" style="inner" options={Object.values(CHART_OPTIONS)} value={localValue} onToggle={handleToggle} />
