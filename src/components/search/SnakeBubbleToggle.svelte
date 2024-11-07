<script>
	import {onDestroy} from "svelte";
	import Toggle from "$components/helpers/Toggle.svelte";

	import { aSearchFilterExists, aPreviewExists, performerSearchString, selectedPerformers, selectedSong, showAggregateSnakeChart, songSearchString, previewedSong, previewedPerformer } from "$stores/searchAndFilter.js";
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
			selectedSong.set({});
			previewedSong.set({});
			performerSearchString.set("");
			selectedPerformers.set([]);	
			previewedPerformer.set("");	
		}
	}

	// For the final step, if there are search strings or selected search values, we need to be sure we've toggled to individual songs chart
	$: {
		if ($isEndingSandboxStep && $showAggregateSnakeChart) {
			if ($aSearchFilterExists || $aPreviewExists) {
				showAggregateSnakeChart.set(false);
			}
		}
	}

	// Cleanup the subscription when the component is destroyed
	onDestroy(unsubscribe);

	const AGGREGATE_VIEW_ANNOUNCEMENT = "you are in aggregate song view, where you can remove and add love song categories";
	const INDIVIDUAL_VIEW_ANNOUNCEMENT = "you are in individual song view, where you can explore songs and performers";
	$: ariaAnnouncementOnChange = localValue === CHART_OPTIONS.snake ? AGGREGATE_VIEW_ANNOUNCEMENT : INDIVIDUAL_VIEW_ANNOUNCEMENT;
	$: ariaLabel = `Toggle between aggregate song view ${localValue === CHART_OPTIONS.snake ? '(currently selected)' : ''} and individual song view ${localValue === CHART_OPTIONS.bubble ? '(currently selected)' : ''}`
</script>

<Toggle
	{ariaLabel}
	{ariaAnnouncementOnChange}
	options={Object.values(CHART_OPTIONS)}
	value={localValue}
	onToggle={handleToggle}
/>
