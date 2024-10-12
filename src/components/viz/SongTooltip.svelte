<script>
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
	import SelectedSongAnnotation from "./annotations/SelectedSongAnnotation.svelte";

	$: onClear = () => hoveredSongInfo.set({});
</script>

<SelectedSongAnnotation songInfo={$hoveredSongInfo} {onClear} />