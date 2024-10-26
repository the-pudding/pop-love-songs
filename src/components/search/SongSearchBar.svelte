<script>
    import { LOVE_SONG_TYPE_CONSTANTS, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP, SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
    import { formatPerformersForDisplay, formatYearForDisplay, getArrayOfPerformers } from "$data/data-utils";
    import { selectedSongsData } from "$stores/dataDerivations";
    import { selectedPerformers, previewedSong, selectedSong, songSearchString, typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { nodePositionsInSimulation } from "$stores/simulation";
	import { isEndingSandboxStep } from "$stores/storySteps";

    import SearchBarAndDropdown from "./SearchBarAndDropdown.svelte";
    import SongSearchResult from "./SongSearchResult.svelte";

     const getAriaLabel = (result) => {
        const userRejectedType = $isEndingSandboxStep && $typesTreatedAsNonLoveSongs.includes(+result.loveSongType);
        const songDescription = `"${result.songName}" by ${result.performerNames} (released ${result.year})`;
        const loveSongTypeDescription = ` of category ${LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[result.loveSongType]}${userRejectedType ? ` originally but now dubbed ${LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]}` : ''}`;
        return `${songDescription}${$isEndingSandboxStep ? loveSongTypeDescription : ''}`;
    }

    // OPTIMIZATION: technically, we only ever render the first N (in sorted order). Is it faster to sort first... then compute necessary properties on the first N? 
    //  Or is that a trivial improvement? (probably not when we have 5k points)
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
        }))
        .map(result => ({
            ...result,
            ariaLabel: getAriaLabel(result)
        }))
        .sort((a, b) => {
            // When looking at a performer, we want the song list to mirror the bubbles in vertical order
            if ($selectedPerformers.length) {
                return $nodePositionsInSimulation[a.songIndex].y - $nodePositionsInSimulation[b.songIndex].y;
            }
            return b.total_weeks_in_top_10 - a.total_weeks_in_top_10;
        });

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

    $: getPlaceholder = (forAriaLabel = false) => {
        if ($selectedSong.song) {
            const songName = $selectedSong.song[SONG_DATA_COLUMNS_ENUM.song];
            return forAriaLabel ? `Selected ${songName}` : songName
        } else if ($selectedPerformers.length > 0) {
            const songCount = $selectedSongsData.length;
            return `${songCount} song${songCount !== 1 ? 's' : ''} with ${$selectedPerformers[0]}:`;
        } else {
            return `${forAriaLabel ? 'Search' : 'Highlight'} songs...`;
        }
    }

    $: inputAriaLabel = getPlaceholder(true);
</script>

<SearchBarAndDropdown
    dropdownId="song"
    placeholder={getPlaceholder()}
    bind:searchString={$songSearchString}
    {searchResults}
    inputAriaLabel={inputAriaLabel}
    dropdownAriaLabel={"Song search results, sorted by total weeks in the Billboard Top 10"}
    clearSelection={handleClearSelection}
    onResultSelected={handleSelectedSong}
    onResultPreviewed={handleResultPreviewed}
    onInputFocused={handleInputFocused}
    renderComponent={SongSearchResult}
    hasSelection={!!$selectedSong.song}
/>