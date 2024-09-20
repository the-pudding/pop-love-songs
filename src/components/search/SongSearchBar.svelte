<script>
    import SearchBar from "./SearchBar.svelte";
    let searchString = "";

</script>

<SearchBar placeholder="Search songs..." bind:searchString={searchString} />