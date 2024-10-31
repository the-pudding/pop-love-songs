<script>
	import IntelligentlyPlacedSongAnnotation from './IntelligentlyPlacedSongAnnotation.svelte';
	import { selectedSong } from "$stores/searchAndFilter";
	import { selectedSongWithMetadata } from '$stores/visualEncodings';

    $: onClear = () => selectedSong.set({});
</script>

<IntelligentlyPlacedSongAnnotation songInfo={$selectedSongWithMetadata} {onClear} xOffset={1} yOffset={1} />