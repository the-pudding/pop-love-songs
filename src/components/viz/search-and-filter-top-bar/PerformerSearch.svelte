<script>
	import searchAndFilter from "$stores/searchAndFilter.js";
</script>

<div>
    <label for="input--performer-search">Performers:</label>
    <input
        id="input--performer-searc"
        type="search"
        placeholder="Search peferformers"
        bind:value={$searchAndFilter.performerSearchString}
    />
</div>