<script>
    import { SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
    import { formatYearForDisplay } from "$data/data-utils";
    import { selectedSongsData } from "$stores/dataDerivations";
    import { selectedSongs, songSearchString } from "$stores/searchAndFilter";

    import SearchBar from "./SearchBar.svelte";
    import SongSearchResult from "./SongSearchResult.svelte";

    $: searchResults = $selectedSongsData.map(({song}) => ({
        songName: song[SONG_DATA_COLUMNS_ENUM.song],
        year: formatYearForDisplay(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]),
        loveSongType: song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type],
        total_weeks_in_top_10: song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]
    })).sort((a, b) => b.total_weeks_in_top_10 - a.total_weeks_in_top_10);

    $: handleSelectedSong = ({ songName }) => {
        $selectedSongs = [songName];
        $songSearchString = "";
    }

    $: handleInputFocused = () => {
        $selectedSongs = [];
        $songSearchString = "";
    }

    $: placeholder = $selectedSongs[0] || "Search songs...";
</script>

<SearchBar
    {placeholder}
    bind:searchString={$songSearchString}
    {searchResults}
    onResultSelected={handleSelectedSong}
    onInputFocused={handleInputFocused}
    renderComponent={SongSearchResult}
/>