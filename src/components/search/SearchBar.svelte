<script>
    import { aSearchBarIsFocused } from "$stores/searchAndFilter";
    export let placeholder = "Search...";
    export let searchString = "";
    export let searchResults = [];
    export let renderComponent = null;
    export let clearSelection = () => {};
    export let onResultSelected = () => {};
    export let onResultPreviewed = () => {};
    export let onInputFocused = () => {};
    export let hasSelection = false;

    const MAX_RESULTS = 50; // TODO: I could just use virtualization here
    $: searchResultsSubsetToRender = searchResults.slice(0, MAX_RESULTS);

    let showDropdown = false;
    let selectedIndex = -1;
    let resultDOMElements = [];

    $: handleResultSelected = (result) => {
        onResultSelected(result);
        showDropdown = false;
        selectedIndex = -1;
    }

    $: handleFocus = () => {
        onInputFocused();
        aSearchBarIsFocused.set(true);
        showDropdown = true;
    }

    $: handleBlur = () => {
        aSearchBarIsFocused.set(false);
        showDropdown = false;
        selectedIndex = -1;
    }

    $: handleClearingSelection = () => {
        clearSelection();
        showDropdown = true;
    }

    $: {
        // Clear the selection if the user starts searching
        if (!!searchString.length && hasSelection) {
            handleClearingSelection();
        }
    }
    
    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % searchResultsSubsetToRender.length;
            onResultPreviewed(searchResultsSubsetToRender[selectedIndex]);
            event.preventDefault();
            scrollToSelectedItem();
            if (hasSelection) {
                handleClearingSelection();
            }
        } else if (event.key === "ArrowUp") {
            selectedIndex = (selectedIndex - 1 + searchResultsSubsetToRender.length) % searchResultsSubsetToRender.length;
            onResultPreviewed(searchResultsSubsetToRender[selectedIndex]);
            event.preventDefault();
            scrollToSelectedItem();
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            handleResultSelected(searchResultsSubsetToRender[selectedIndex]);
            event.preventDefault();
        }
    };

    $: {
        // When there's just one result, convention says hitting enter should select it, so we'll prep it for that here
        if (searchResultsSubsetToRender.length === 1) {
            selectedIndex = 0;
        }
    }

    const scrollToSelectedItem = () => {
        if (resultDOMElements[selectedIndex]) {
            resultDOMElements[selectedIndex].scrollIntoView({ block: "nearest" });
        }
    };
</script>

<div class="search-container">
    <input 
        type="text" 
        placeholder={placeholder} 
        bind:value={searchString} 
        on:focus={handleFocus} 
        on:blur={handleBlur} 
        on:keydown={handleKeyDown}
        class:has-selection={hasSelection}
    />

    {#if showDropdown}
        <div class="dropdown-wrapper">
            {#if searchResultsSubsetToRender.length === 0}
                <div class="no-results">
                    Couldn't find anything. Try thinking more <i>mainstream</i>...
                </div>
            {:else}
                <ul role="listbox" class="dropdown">
                    {#each searchResultsSubsetToRender as result, index}
                        <li 
                            role="option"
                            aria-selected={selectedIndex === index} 
                            class:selected={selectedIndex === index}
                            bind:this={resultDOMElements[index]}
                            on:mousedown={() => handleResultSelected(result)}
                            on:mouseenter={() => onResultPreviewed(result)}
                        >
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
        padding-left: 8px;
        padding-right: 8px;
    }

    .dropdown {
        list-style: none;
        padding: 0;
    }

    .dropdown li {
        padding: 8px;
        cursor: pointer;
        border-radius: 8px;
        border: 1px solid transparent;
    }
    .dropdown li.selected {
        background-color: #f0f0f097;
        border: 1px solid var(--color-focus);
    }
    .dropdown li:hover {
        background-color: #f0f0f0;
    }
</style>