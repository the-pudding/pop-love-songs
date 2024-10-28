<script>
    import { LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP, SONG_DATA_COLUMNS_ENUM } from "$data/data-constants";
    import { formatPerformersForDisplay, formatYearForDisplay, getArrayOfPerformers } from "$data/data-utils";
    import { SONG_SEARCH_INPUT_ID } from "$utils/searchBar";

    import { selectedSongsData } from "$stores/dataDerivations";
    import { selectedPerformers, previewedSong, selectedSong, songSearchString, typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { nodePositionsInSimulation } from "$stores/simulation";
	import { isEndingSandboxStep } from "$stores/storySteps";

    import SearchBarAndDropdown from "./SearchBarAndDropdown.svelte";
    import SongSearchResult from "./SongSearchResult.svelte";

    const getAriaLabel = (result) => {
        const userRejectedType = $isEndingSandboxStep && $typesTreatedAsNonLoveSongs.includes(+result.loveSongType);
        const songDescription = `"${result.songName}" by ${result.performerNames} (released ${result.year})`;
        const loveSongTypeDescription = ` of category ${LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[result.loveSongType]}${userRejectedType ? ` originally but now you've removed it from the love song category` : ''}`;
        return `${songDescription}${$isEndingSandboxStep ? loveSongTypeDescription : ''}`;
    }

    $: searchResults = $selectedSongsData.map(({song, songIndex}) => {
        const songName = song[SONG_DATA_COLUMNS_ENUM.song];
        const performerNames = formatPerformersForDisplay(getArrayOfPerformers(song));
        const year = formatYearForDisplay(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);
        const loveSongType = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
        const total_weeks_in_top_10 = song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10];

        const result = {
            song,
            songIndex,
            songName,
            performerNames,
            year,
            loveSongType,
            total_weeks_in_top_10
        };

        return {
            ...result,
            ariaLabel: getAriaLabel(result)
        };
    })
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
        } else if ($selectedPerformers.length) {
            const songCount = $selectedSongsData.length;
            return `${songCount} song${songCount !== 1 ? 's' : ''} with ${$selectedPerformers[0]}:`;
        } else {
            return `${forAriaLabel ? 'Search' : 'Highlight'} songs...`;
        }
    }

    $: inputAriaLabel = getPlaceholder(true);
</script>

<SearchBarAndDropdown
    inputId={SONG_SEARCH_INPUT_ID}
    dropdownId={'song'}
    placeholder={getPlaceholder()}
    bind:searchString={$songSearchString}
    {searchResults}
    inputAriaLabel={inputAriaLabel}
    dropdownAriaLabel={`Song search results, sorted by ${$selectedPerformers.length ? 'love song type' : 'total weeks in top 10'}`}
    clearSelection={handleClearSelection}
    onResultSelected={handleSelectedSong}
    onResultPreviewed={handleResultPreviewed}
    onInputFocused={handleInputFocused}
    renderComponent={SongSearchResult}
    hasSelection={!!$selectedSong.song}
/>