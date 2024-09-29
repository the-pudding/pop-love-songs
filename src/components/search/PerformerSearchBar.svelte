<script>
	import { getArrayOfPerformers } from "$data/data-utils";
	import { selectedSongsData } from "$stores/dataDerivations";
    import { performerSearchString } from "$stores/searchAndFilter";

    import SearchBar from "./SearchBar.svelte";

    $: searchResults = Array.from(new Set(
        $selectedSongsData.reduce((acc, { song }) =>
            [
                ...acc, 
                ...getArrayOfPerformers(song).filter(
                    performer => performer.toLowerCase().includes($performerSearchString.toLowerCase())
                )
            ],
            []
        )
    ));
</script>

<SearchBar placeholder="Search performers..." bind:searchString={$performerSearchString} {searchResults} />