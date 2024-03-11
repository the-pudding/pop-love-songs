<script>
	import MainViz from "./viz/MainViz.svelte";
	import SideBar from "./viz/SideBar.svelte";
	import StoryStepController from "./story-steps/StoryStepController.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import SearchAndFilterTopBar from "./viz/search-and-filter-top-bar/SearchAndFilterTopBar.svelte";
</script>

<SearchAndFilterTopBar />
<MainViz />
<SideBar />
<StoryStepController />
<SongTooltip />
