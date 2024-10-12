<script>
    import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
    import { formatYearForDisplay } from "$data/data-utils";
    import { selectedSongsData } from "$stores/dataDerivations";
    import { selectedPerformers, selectedSong, songSearchString } from "$stores/searchAndFilter";

    import SearchBar from "./SearchBar.svelte";
    import SongSearchResult from "./SongSearchResult.svelte";

    $: searchResults = $selectedSongsData.map(({song, songIndex}) => ({
        song,
        songIndex,
        songName: song[SONG_DATA_COLUMNS_ENUM.song],
        year: formatYearForDisplay(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]),
        loveSongType: song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
        total_weeks_in_top_10: song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]
    })).sort((a, b) => b.total_weeks_in_top_10 - a.total_weeks_in_top_10);

    $: handleSelectedSong = ({ song, songIndex }) => {
        $selectedSong = { song, songIndex };
        $songSearchString = "";

    }

    $: handleInputFocused = () => {
        $selectedSong = {};
        $songSearchString = "";
    }

    $: getPlaceholder = () => {
        if ($selectedSong.song) {
            const songName = $selectedSong.song[SONG_DATA_COLUMNS_ENUM.song];
            return songName
        } else if ($selectedPerformers.length > 0) {
            return `Songs by ${$selectedPerformers[0]}:`;
        } else {
            return "Highlight songs...";
        }
    }
</script>

<SearchBar
    placeholder={getPlaceholder()}
    bind:searchString={$songSearchString}
    {searchResults}
    onResultSelected={handleSelectedSong}
    onInputFocused={handleInputFocused}
    renderComponent={SongSearchResult}
    hasSelection={!!$selectedSong.song}
/>