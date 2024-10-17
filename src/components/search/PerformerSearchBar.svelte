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

    $: searchResults = Object.entries(performerSongCountMap).map(([name, songCountByLoveSongType]) => ({
        name,
        songCountByLoveSongType,
        totalSongCount: Object.values(songCountByLoveSongType).reduce((acc, count) => acc + count, 0)
    })).sort((a, b) => b.totalSongCount - a.totalSongCount);

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

    $: placeholder = $selectedPerformers[0] || "Highlight performers...";
</script>

<SearchBarAndDropdown
    {placeholder}
    bind:searchString={$performerSearchString}
    {searchResults}
    clearSelection={handleClearingSelection}
    onResultSelected={handleSelectedPerformer}
    onResultPreviewed={handlePreviewedPerformer}
    onInputFocused={handleInputFocused}
    onInputBlurred={handleInputBlurred}
    renderComponent={PerformerSearchResult}
    hasSelection={$selectedPerformers.length > 0}
/>