<script>
    import SearchBar from "./SearchBar.svelte";
    let searchString = "";
</script>

<SearchBar placeholder="Search performers..." bind:searchString={searchString} />