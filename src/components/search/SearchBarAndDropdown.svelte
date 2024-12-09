<script>
    import { afterUpdate, onDestroy } from "svelte";
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
    // Note preview is triggered on mousemove, not on mouseenter, so that a user can tab through on their way to annotations, 
    // have the dropdown open with their mouse coincidentally over an option, but not accidentally trigger a hiding of the annotations due to a preview existing.
    export let onResultPreviewed = () => {};
    export let onInputFocused = () => {};
    export let onInputBlurred = () => {};
    export let hasSelection = false;

    
    const MAX_RESULTS = 75; // Drake, the most featured artist, has 70 songs, so we want at least that much
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
            if ($openedDropdown !== dropdownId) {
                openedDropdown.set(dropdownId);
            }
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

    const focusableElements = ["a", "button", "input", "textarea", "select", "details", "[tabindex]:not([tabindex='-1'])"];
    let focusEventListeners = [];

    // If any other element is focused, close the dropdown
    afterUpdate(() => {
        // Clean up previous event listeners
        focusEventListeners.forEach(({ element, listener }) => {
            element.removeEventListener('focus', listener);
        });
        focusEventListeners = [];

        // Add new event listeners
        focusableElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const listener = (event) => {
                    const isInsideSearchContainer = Array.from(document.querySelectorAll('.search-container')).some(container => container.contains(event.target));
                    if (!isInsideSearchContainer) {
                        openedDropdown.set(null);
                    }
                };
                element.addEventListener('focus', listener);
                focusEventListeners.push({ element, listener });
            });
        });
    });

    onDestroy(() => {
        focusEventListeners.forEach(({ element, listener }) => {
            element.removeEventListener('focus', listener);
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
        autocomplete="off"
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
                            on:mousemove={() => onResultPreviewed(result)}
                            on:mouseleave={() => onResultPreviewed()}
                        >
                            <svelte:component this={renderComponent} {result} />
                        </li>
                    {/each} 
                </ul>
                {#if searchResults.length > searchResultsSubsetToRender.length}
                    <div aria-hidden="true" class="more-results">
                        <b>{searchResultsSubsetToRender.length}</b> out of <b>{searchResults.length}</b> results wasn't enough for you? Ok, you data-holic, try another filter to explore more...
                    </div>
                {/if}
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
        z-index: 1000000001; /* always must be top most element */
    }

    .no-results, .more-results {
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
        overflow-y: auto;
        background-color: var(--color-cream-background);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--search-bar-border-radius);
        margin-top: 8px;
        padding-left: 8px;
        padding-right: 8px;

        z-index: 1000000001; /* always must be top most element */
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