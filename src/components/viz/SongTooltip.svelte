<script>
	import hoveredSongInfo from "$stores/hoveredSongInfo.js";
	import IntelligentlyPlacedSongAnnotation from "./annotations/IntelligentlyPlacedSongAnnotation.svelte";

	$: onClear = () => hoveredSongInfo.set({});
</script>

<IntelligentlyPlacedSongAnnotation songInfo={$hoveredSongInfo} {onClear} />