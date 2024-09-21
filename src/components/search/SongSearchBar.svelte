<script>
    import { songSearchString } from "$stores/searchAndFilter";

    import SearchBar from "./SearchBar.svelte";

</script>

<SearchBar placeholder="Search songs..." bind:searchString={$songSearchString} />