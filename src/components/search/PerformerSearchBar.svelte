<script>
    import { performerSearchString } from "$stores/searchAndFilter";
    import SearchBar from "./SearchBar.svelte";
</script>

<SearchBar placeholder="Search performers..." bind:searchString={$performerSearchString} />