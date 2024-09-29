<script>
	import { getArrayOfPerformers } from "$data/data-utils";
	import { selectedSongsData } from "$stores/dataDerivations";
    import { performerSearchString } from "$stores/searchAndFilter";
	import PerformerSearchResult from "./PerformerSearchResult.svelte";

    import SearchBar from "./SearchBar.svelte";

    $: performerNames = Array.from(new Set(
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
    $: searchResults = performerNames.map(name => ({ name }));
</script>

<SearchBar
    placeholder="Search performers..."
    bind:searchString={$performerSearchString}
    {searchResults}
    renderComponent={PerformerSearchResult}
/>