<script>
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";

	import MainViz from "./viz/MainViz.svelte";
	import ListViewSideBar from "./viz/ListViewSideBar.svelte";
	import SongTooltip from "./viz/SongTooltip.svelte";
	import SearchAndFilterTopBar from "./viz/search-and-filter-top-bar/SearchAndFilterTopBar.svelte";

	// @michelle: does this belong here? I just wanted to move it out of MainViz cuz it was causing a re-render on every hover callback (sooo many)
	// Feels mildly awkward -- but is there a place ot put this that's not in a component?
	export const handleSongHovered = (selectedSong, offsetX, offsetY) => {
		if (selectedSong) {
			$hoveredSongInfo = {
				song: selectedSong,
				x: offsetX,
				y: offsetY
			};
		} else if ($hoveredSongInfo.song) {
			// no need to trigger reactive update by writing to the store unless there is a song to overwrite
			$hoveredSongInfo = {
				song: null,
				x: null,
				y: null
			};
		}
	};
</script>

<SearchAndFilterTopBar />
<MainViz {handleSongHovered} />
<ListViewSideBar />
<SongTooltip />
