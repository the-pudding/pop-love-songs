<script>
	import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
	import { getArrayOfPerformers } from "$data/data-utils";
	import { visibleSongsData } from "$stores/dataDerivations";
    import { performerSearchString, previewedSong, selectedPerformers, selectedSong, songSearchString } from "$stores/searchAndFilter";
	import PerformerSearchResult from "./PerformerSearchResult.svelte";

    import SearchBar from "./SearchBar.svelte";

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
        $performerSearchString = "";
    }

    $: handleInputFocused = () => {
        $selectedPerformers = [];
        $performerSearchString = "";

        // since we're searching performers again, clear any existing song filter
        $selectedSong = {};
        $previewedSong = {};
        $songSearchString = "";
    }

    $: placeholder = $selectedPerformers[0] || "Highlight performers...";
</script>

<SearchBar
    {placeholder}
    bind:searchString={$performerSearchString}
    {searchResults}
    clearSelection={() => $selectedPerformers = []}
    onResultSelected={handleSelectedPerformer}
    onResultPreviewed={() => { /* TODO */}}
    onInputFocused={handleInputFocused}
    renderComponent={PerformerSearchResult}
    hasSelection={$selectedPerformers.length > 0}
/>