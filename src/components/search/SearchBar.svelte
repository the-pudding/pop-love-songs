<script>
    import { aSearchBarIsFocused, performerSearchString } from "$stores/searchAndFilter";
    export let placeholder = "Search...";
    export let searchString = "";
    export let searchResults = [];
    export let renderComponent = null;
    export let onResultSelected = () => {};
    export let onInputFocused = () => {};
    export let hasSelection = false;

    const MAX_RESULTS = 30;

    let isFocused = false

    $: handleResultClicked = (result) => {
        onResultSelected(result);
    }

    $: handleFocus = () => {
        onInputFocused();
        aSearchBarIsFocused.set(true);
        isFocused = true;

        $performerSearchString = "";
    }
</script>

<div class="search-container">
    <input 
        type="text" 
        placeholder={placeholder} 
        bind:value={searchString} 
        on:focus={handleFocus} 
        on:blur={() => { aSearchBarIsFocused.set(false); isFocused = false; }} 
        class:has-selection={hasSelection}
    />

    {#if isFocused}
        <div class="dropdown-wrapper">
            {#if searchResults.length === 0}
                <div class="no-results">
                    Couldn't find anything. Try thinking more <i>mainstream</i>...
                </div>
            {:else}
                <ul class="dropdown">
                    {#each searchResults.slice(0, MAX_RESULTS) as result}
                        <!-- TODO: make this accessibly correct -->
                        <li on:mousedown={() => handleResultClicked(result)}>
                            {#if renderComponent}
                                <svelte:component this={renderComponent} {result} />
                            {:else}
                                {result}
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    {/if}
</div>

<style>
    input.has-selection::placeholder {
        color: black;
        font-weight: bold;
        font-style: normal;
    }

    .search-container {
        height: var(--search-bar-height);
    }

    .no-results {
        padding: 8px;
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
        width: 100%;
        max-height: 280px;
        overflow-y: scroll;

        background-color: var(--color-cream-background);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--search-bar-border-radius);
        

        margin-top: 8px;

        padding-left: 6px;
        padding-right: 8px;
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