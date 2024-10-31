<script>
    import { tick } from "svelte";
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	import { getArrayOfPerformers } from "$data/data-utils";
    import { SONG_SEARCH_INPUT_ID } from "$utils/searchBar";
	import { visibleSongsData } from "$stores/dataDerivations";
    import { performerSearchString, previewedPerformer, previewedSong, selectedPerformers, selectedSong, songSearchString } from "$stores/searchAndFilter";
	
    import SearchBarAndDropdown from "./SearchBarAndDropdown.svelte";
    import PerformerSearchResult from "./PerformerSearchResult.svelte";

    $: performerSongCountMap = $visibleSongsData.reduce((acc, { song }) => {
        getArrayOfPerformers(song).forEach(performer => {
            const lowerCasePerformer = performer.toLowerCase();
            if (lowerCasePerformer.includes($performerSearchString.toLowerCase())) {
                if (!acc[performer]) {
                    acc[performer] = {};
                }
                const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
                if (!acc[performer][loveSongType]) {
                    acc[performer][loveSongType] = 0;
                }
                acc[performer][loveSongType]++;
            }
        });
        return acc;
    }, {});

    const getAriaLabel = ({name, totalSongCount}) => `${name} has ${totalSongCount} song credit${totalSongCount !== 1 ? 's' : ''}`

    $: searchResults = Object.entries(performerSongCountMap).map(([name, songCountByLoveSongType]) => {
        const totalSongCount = Object.values(songCountByLoveSongType).reduce((acc, count) => acc + count, 0);
        return {
            name,
            songCountByLoveSongType,
            totalSongCount,
            ariaLabel: getAriaLabel({ name, totalSongCount })
        };
    }).sort((a, b) => b.totalSongCount - a.totalSongCount);
    
    $: handleSelectedPerformer = ({name}) => {
        $selectedPerformers = [name];
        $previewedPerformer = "";
        $performerSearchString = "";

        // For accessibility (and general UX), focus on the song search input after selecting a performer.
        // Svelte smell: Svelte's tick() doesn't work here, since we actually want the entire call stack to complete,
        // otherwise, in the event of a click event, that event will actually blur the input again
        setTimeout(() => {
            document.getElementById(SONG_SEARCH_INPUT_ID).focus();
        }, 0);
    }

    $: handlePreviewedPerformer = (result = {}) => {
        const { name } = result;
        if (!name) {
            $previewedPerformer = "";
        } else {
            $previewedPerformer = name;
        }
    }

    $: handleInputFocused = () => {
        $selectedPerformers = [];
        $previewedPerformer = "";
        $performerSearchString = "";

        // since we're searching performers again, clear any existing song filter
        $selectedSong = {};
        $previewedSong = {};
        $songSearchString = "";
    }

    $: handleClearingSelection = () => {
        $selectedPerformers = [];
        $previewedPerformer = "";
        $performerSearchString = "";
    }

    $: handleInputBlurred = () => {
        $previewedPerformer = "";
        $performerSearchString = "";
    }

    $: hasSelection = $selectedPerformers.length > 0;

    $: getInputAriaLabel = () => {
        if (hasSelection) {
            return `Selected ${$selectedPerformers[0]}. Explore their song credits in the adjacent songs dropdown`;
        } else {
            return "Search and select an artist. Once selected, you can explore all songs on which they appear in the adjacent songs dropdown";
        }
    }

    $: placeholder = $selectedPerformers[0] || "Highlight artists...";
</script>

<SearchBarAndDropdown
    inputId="performer-search"
    dropdownId="performer"
    {placeholder}
    bind:searchString={$performerSearchString}
    {searchResults}
    inputAriaLabel={getInputAriaLabel()}
    dropdownAriaLabel={"Artist search results, sorted by total song credits"}
    clearSelection={handleClearingSelection}
    onResultSelected={handleSelectedPerformer}
    onResultPreviewed={handlePreviewedPerformer}
    onInputFocused={handleInputFocused}
    onInputBlurred={handleInputBlurred}
    renderComponent={PerformerSearchResult}
    {hasSelection}
/>