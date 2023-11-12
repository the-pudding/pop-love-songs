<script>
	// import { getContext } from "svelte";
	import MainViz from "./viz/MainViz.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import SearchAndFilterTopBar from "./viz/search-and-filter-top-bar/SearchAndFilterTopBar.svelte";
	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<SearchAndFilterTopBar />
<MainViz />
<SongTooltip />
