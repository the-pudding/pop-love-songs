<script>
	import searchAndFilter from "$stores/searchAndFilter.js";
</script>

<div>
    <label for="input--song-search">Songs:</label>
    <input
        id="input--song-search"
        type="search"
        placeholder="Search songs"
        bind:value={$searchAndFilter.songSearchString}
    />
</div>