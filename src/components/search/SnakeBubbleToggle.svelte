<script>
	import {onDestroy} from "svelte";
	import Toggle from "$components/helpers/Toggle.svelte";

	import { aSearchBarIsFocused, performerSearchString, selectedPerformers, selectedSong, showAggregateSnakeChart, songSearchString } from "$stores/searchAndFilter.js";
	import { isEndingSandboxStep } from "$stores/storySteps";

	const CHART_OPTIONS = {
		snake: 'change categories',
		bubble: 'explore songs'
	}

	let localValue;

	const unsubscribe = showAggregateSnakeChart.subscribe(($showAggregateSnakeChart) => {
		localValue = $showAggregateSnakeChart? CHART_OPTIONS.snake : CHART_OPTIONS.bubble;
	});

	const handleToggle = ({value}) => {
		localValue = value;
		showAggregateSnakeChart.set(localValue === CHART_OPTIONS.snake);

		if (localValue === CHART_OPTIONS.snake) {
			songSearchString.set("");
			selectedSong.set([]);
			performerSearchString.set("");
			selectedPerformers.set([]);		
		}
	}

	// For the final step, if there are search strings or selected search values, we need to be sure we've toggled to individual songs chart
	// @michelle Is this a random place to put this? Like should this be a derived store or something? What's tricking is that others are writing to showAggregateSnakeChart, too.
	$: {
		if ($isEndingSandboxStep && $showAggregateSnakeChart) {
			if ($aSearchBarIsFocused) {
				showAggregateSnakeChart.set(false);
			}
		}
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);
</script>

<Toggle label="switch between aggregate and individual song view" style="inner" options={Object.values(CHART_OPTIONS)} value={localValue} onToggle={handleToggle} />
