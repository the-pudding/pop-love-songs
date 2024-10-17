<script>
    import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
    import { formatPerformersForDisplay, formatYearForDisplay, getArrayOfPerformers } from "$data/data-utils";
    import { selectedSongsData } from "$stores/dataDerivations";
    import { selectedPerformers, previewedSong, selectedSong, songSearchString } from "$stores/searchAndFilter";

    import SearchBarAndDropdown from "./SearchBarAndDropdown.svelte";
    import SongSearchResult from "./SongSearchResult.svelte";

    $: searchResults = $selectedSongsData.map(({song, songIndex}) => ({
        song,
        songIndex,
        songName: song[SONG_DATA_COLUMNS_ENUM.song],
        performerNames: formatPerformersForDisplay(
            getArrayOfPerformers(song)
        ),
        year: formatYearForDisplay(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]),
        loveSongType: song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
        total_weeks_in_top_10: song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]
    })).sort((a, b) => b.total_weeks_in_top_10 - a.total_weeks_in_top_10);

    $: handleSelectedSong = ({ song, songIndex }) => {
        $selectedSong = { song, songIndex };
        $songSearchString = "";
    }

    $: handleResultPreviewed = (result = {}) => {
        const { song, songIndex } = result;
        if (!song) {
            $previewedSong = {};
        } else {
            $previewedSong = { song, songIndex };
        }
        
    }

    $: handleInputFocused = () => {
        $selectedSong = {};
        $previewedSong = {};
        $songSearchString = "";
    }

    $: handleClearSelection = () => {
        $selectedSong = {};
    }

    $: getPlaceholder = () => {
        if ($selectedSong.song) {
            const songName = $selectedSong.song[SONG_DATA_COLUMNS_ENUM.song];
            return songName
        } else if ($selectedPerformers.length > 0) {
            const songCount = $selectedSongsData.length;
            return `${songCount} song${songCount > 1 ? 's' : ''} with ${$selectedPerformers[0]}:`;
        } else {
            return "Highlight songs...";
        }
    }
</script>

<SearchBarAndDropdown
    placeholder={getPlaceholder()}
    bind:searchString={$songSearchString}
    {searchResults}
    clearSelection={handleClearSelection}
    onResultSelected={handleSelectedSong}
    onResultPreviewed={handleResultPreviewed}
    onInputFocused={handleInputFocused}
    renderComponent={SongSearchResult}
    hasSelection={!!$selectedSong.song}
/>