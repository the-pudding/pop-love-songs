<script>
	import MainViz from "./viz/MainViz.svelte";
	import SideBar from "./viz/SideBar.svelte";
	import StoryStepController from "./story-steps/StoryStepController.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import SearchAndFilterTopBar from "./viz/search-and-filter-top-bar/SearchAndFilterTopBar.svelte";
	
	// TODO: disable devMode in production
	import devMode from "$stores/devMode";
	$: handleKeyPress = (e) => {
		if (e.key === "d") {
			devMode.update((devMode) => !devMode);
		}
	};
</script>

<svelte:window on:keydown={handleKeyPress} />

{#if $devMode}
	<SearchAndFilterTopBar />
{/if}
<MainViz />
{#if $devMode}
	<SideBar />
{/if}
<StoryStepController />
<SongTooltip />
