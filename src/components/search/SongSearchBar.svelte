<script>
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	import { selectedSongsData } from "$stores/dataDerivations";
    import { songSearchString } from "$stores/searchAndFilter";

    import SearchBar from "./SearchBar.svelte";

    $: searchResults = $selectedSongsData.map(({song}) => song[SONG_DATA_COLUMNS_ENUM.song]);
</script>

<SearchBar placeholder="Search songs..." bind:searchString={$songSearchString} {searchResults} />