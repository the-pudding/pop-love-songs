<script>
    import { aSearchBarIsFocused } from "$stores/searchAndFilter";
    export let placeholder = "Search...";
    export let searchString = "";
    export let searchResults = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango'];
    export let renderComponent = null;
    export let noResultsMessage = "No matching results";

    const MAX_RESULTS = 5;

    let isFocused = false
</script>

<div class="search-container">
    <input 
        type="text" 
        placeholder={placeholder} 
        bind:value={searchString} 
        on:focus={() => { aSearchBarIsFocused.set(true); isFocused = true; }} 
        on:blur={() => { aSearchBarIsFocused.set(false); isFocused = false; }} 
    />

    {#if isFocused}
        <div class="dropdown-wrapper">
            {#if searchResults.length === 0}
                <div>{noResultsMessage}</div>
            {:else}
                <ul class="dropdown">
                    {#each searchResults.slice(0, MAX_RESULTS) as result}
                        <li>
                            {#if renderComponent}
                                <svelte:component this={renderComponent} {result} />
                            {:else}
                                {result}
                            {/if}
                        </li>
                    {/each}
                </ul>
                {#if searchResults.length > MAX_RESULTS}
                    <div class="overflow-overlay"/>
                {/if}
            {/if}
        </div>
    {/if}
</div>

<style>
    .search-container {
        height: var(--search-bar-height);
    }

    .overflow-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;

        border-radius: var(--search-bar-border-radius);
        background: linear-gradient(rgba(255, 255, 255, 0), var(--color-cream-background));
        pointer-events: none;
    }
    .search-container {
        position: relative;
        width: 300px;
        margin-right: 24px;
    }

    input {
        width: 100%;
        height: 100%;
        background-color: var(--color-cream-background);
        border-radius: var(--search-bar-border-radius);
        font-family: var(--sans);
        font-style: italic;
    }

    .dropdown-wrapper {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--color-cream-background);
        border: 1px solid #ccc;
        border-radius: var(--search-bar-border-radius);
        margin-top: 4px;
        
        
        width: 100%;
        z-index: 1;
    }

    .dropdown {
        list-style: none;
        padding: 0;
    }

    .dropdown li {
        padding: 8px;
        cursor: pointer;
        border-radius: var(--search-bar-border-radius);
    }

    .dropdown li:hover {
        background-color: #f0f0f0;
    }
</style>