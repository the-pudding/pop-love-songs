<script>
    import { afterUpdate } from "svelte";
    import { aSearchBarIsFocused, openedDropdown } from "$stores/searchAndFilter";
    export let inputId;
    export let dropdownId;
    export let placeholder = "Search...";
    export let inputAriaLabel = "Search and select a result...";
    export let dropdownAriaLabel = "Search results";
    export let searchString = "";
    export let searchResults = [];
    export let renderComponent;
    export let clearSelection = () => {};
    export let onResultSelected = () => {};
    export let onResultPreviewed = () => {};
    export let onInputFocused = () => {};
    export let onInputBlurred = () => {};
    export let hasSelection = false;

    // Drake, the most featured artist, has 70 songs
    const MAX_RESULTS = 70; // TODO: I could just use virtualization here
    $: searchResultsSubsetToRender = searchResults.slice(0, MAX_RESULTS);

    let selectedIndex = -1;
    let resultDOMElements = [];

    $: handleResultSelected = (result) => {
        onResultSelected(result);
        openedDropdown.set(null);
        selectedIndex = -1;
    }

    $: handleFocus = () => {
        onInputFocused();
        aSearchBarIsFocused.set(true);
        openedDropdown.set(dropdownId);
    }

    $: handleBlur = () => {
        onInputBlurred();
        aSearchBarIsFocused.set(false);
        selectedIndex = -1;
    }

    $: handleClearingSelection = () => {
        clearSelection();
    }

    $: {
        // Clear the selection if the user starts searching
        if (!!searchString.length) {
            if (hasSelection) {
                handleClearingSelection();
            }
        }
    }
    
    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % searchResultsSubsetToRender.length;
            onResultPreviewed(searchResultsSubsetToRender[selectedIndex]);
            event.preventDefault();
            scrollToSelectedItem();
            openedDropdown.set(dropdownId);
            if (hasSelection) {
                handleClearingSelection();
            }
        } else if (event.key === "ArrowUp") {
            selectedIndex = (selectedIndex - 1 + searchResultsSubsetToRender.length) % searchResultsSubsetToRender.length;
            onResultPreviewed(searchResultsSubsetToRender[selectedIndex]);
            event.preventDefault();
            scrollToSelectedItem();
            openedDropdown.set(dropdownId);
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            handleResultSelected(searchResultsSubsetToRender[selectedIndex]);
            event.preventDefault();
        } else if (event.key === "Escape") {
            clearSelection();
            searchString = "";
            openedDropdown.set(null);
            selectedIndex = -1;
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

    // TODO: Should I clean up event listeners here? (especially since I'm running this on update... is that necessary?)
    afterUpdate(() => {
        // If another element gets focused, close the dropdown
        // const focusableElements = ["a", "button", "input", "textarea", "select", "details", "[tabindex]:not([tabindex='-1'])"];
        const focusableElements = ["button"];
        focusableElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener('focus', (event) => {
                    const isInsideSearchContainer = Array.from(document.querySelectorAll('.search-container')).some(container => container.contains(event.target));
                    if (!isInsideSearchContainer) {
                        openedDropdown.set(null);
                    }
                });
            });
        });
    });
</script>

<svelte:window on:click={(event) => {
    if (!$openedDropdown) return;
    const searchContainers = document.querySelectorAll('.search-container');
    const clickedOutside = !Array.from(searchContainers).some(container => container.contains(event.target));
    if (clickedOutside) {
        openedDropdown.set(null);
    }
}} />

<div class="search-container">
    <input 
        type="text" 
        id={inputId}
        aria-label={inputAriaLabel}
        aria-live="assertive"
        placeholder={placeholder} 
        bind:value={searchString} 
        on:focus={handleFocus} 
        on:blur={handleBlur} 
        on:keydown={handleKeyDown}
        on:mousedown={handleFocus}
        class:has-selection={hasSelection}
    />

    {#if $openedDropdown === dropdownId}
        <div class="dropdown-wrapper" tabindex="-1">
            {#if searchResultsSubsetToRender.length === 0}
                <div class="no-results">
                    No search results. Try thinking more <i>mainstream</i>...
                </div>
            {:else}
                <ul role="listbox" tabindex="-1" class="dropdown" aria-label={dropdownAriaLabel}>
                    {#each searchResultsSubsetToRender as result, index}
                        <li 
                            role="option"
                            aria-label={result.ariaLabel}
                            aria-selected={selectedIndex === index}
                            class:selected={selectedIndex === index}
                            bind:this={resultDOMElements[index]}
                            on:mousedown={() => handleResultSelected(result)}
                            on:mouseenter={() => onResultPreviewed(result)}
                            on:mouseleave={() => onResultPreviewed()}
                        >
                            <svelte:component this={renderComponent} {result} />
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

        z-index: 100000;
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