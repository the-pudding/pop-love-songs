<script>
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	import { getArrayOfPerformers } from "$data/data-utils";
	import { visibleSongsData } from "$stores/dataDerivations";
    import { performerSearchString, previewedPerformer, previewedSong, selectedPerformers, selectedSong, songSearchString } from "$stores/searchAndFilter";
	import PerformerSearchResult from "./PerformerSearchResult.svelte";

    import SearchBarAndDropdown from "./SearchBarAndDropdown.svelte";

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

    // OPTIMIZATION: we could sort first, then compute properties only for the first N. Trivial boost?
    $: searchResults = Object.entries(performerSongCountMap).map(([name, songCountByLoveSongType]) => ({
        name,
        songCountByLoveSongType,
        totalSongCount: Object.values(songCountByLoveSongType).reduce((acc, count) => acc + count, 0)
    }))
    .sort((a, b) => b.totalSongCount - a.totalSongCount)
    .map(result => ({
        ...result, 
        ariaLabel: getAriaLabel(result)
    }))

    $: handleSelectedPerformer = ({name}) => {
        $selectedPerformers = [name];
        $previewedPerformer = "";
        $performerSearchString = "";
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
            return "Search and select a performer. Once selected, you can explore all songs they're credited on in the adjacent songs dropdown";
        }
    }

    $: placeholder = $selectedPerformers[0] || "Highlight performers...";
</script>

<SearchBarAndDropdown
    dropdownId="performer"
    {placeholder}
    bind:searchString={$performerSearchString}
    {searchResults}
    inputAriaLabel={getInputAriaLabel()}
    dropdownAriaLabel={"Performer search results, sorted by total song credits"}
    clearSelection={handleClearingSelection}
    onResultSelected={handleSelectedPerformer}
    onResultPreviewed={handlePreviewedPerformer}
    onInputFocused={handleInputFocused}
    onInputBlurred={handleInputBlurred}
    renderComponent={PerformerSearchResult}
    {hasSelection}
/>