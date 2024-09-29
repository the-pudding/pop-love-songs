<script>
    import { aSearchBarIsFocused } from "$stores/searchAndFilter";

    export let placeholder = "Search...";
    export let searchString = "";
    export let searchResults = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango'];
</script>

<div class="search-container">
    <input 
        type="text" 
        placeholder={placeholder} 
        bind:value={searchString} 
        on:focus={() => aSearchBarIsFocused.set(true)} 
        on:blur={() => aSearchBarIsFocused.set(false)} 
    />

    {#if searchString && searchResults.length > 0}
        <ul class="dropdown">
            {#each searchResults.slice(0, 5) as result}
                <li>{result}</li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .search-container {
        position: relative;
        width: 300px;
        margin-right: 24px;
    }

    input {
        width: 100%;
        background-color: var(--color-cream-background);
        border-radius: 12px;
        font-family: var(--sans);
        font-style: italic;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--color-cream-background);
        border: 1px solid #ccc;
        border-radius: 12px;
        margin-top: 4px;
        padding: 0;
        list-style: none;
        width: 100%;
        z-index: 1;
    }

    .dropdown li {
        padding: 8px;
        cursor: pointer;
    }

    .dropdown li:hover {
        background-color: #f0f0f0;
    }
</style>