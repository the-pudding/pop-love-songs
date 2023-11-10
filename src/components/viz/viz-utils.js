import {
    DATA_COLUMNS_ENUM,
    LOVE_SONG_TYPE_COLOR_MAP
} from "$data/data-constants.js";


export const getSongFill = (song, searchAndFilter) => {
    const loveSongType = song[DATA_COLUMNS_ENUM.love_song_sub_type];
    
    const genreSelected =
        searchAndFilter.selectedGenres.includes(
            song[DATA_COLUMNS_ENUM.generic_genre]
        ) || searchAndFilter.selectedGenres.length === 0;
    const loveSongTypeSelected =
        searchAndFilter.selectedLoveSongTypes.includes(loveSongType) ||
        searchAndFilter.selectedLoveSongTypes.length === 0;
    const performerSelected =
        searchAndFilter.performerSearchString.length === 0 ||
        song[DATA_COLUMNS_ENUM.performer]
            .toLowerCase()
            .includes(searchAndFilter.performerSearchString.toLowerCase());
    const songSelected =
        searchAndFilter.songSearchString.length === 0 ||
        song[DATA_COLUMNS_ENUM.song]
            .toLowerCase()
            .includes(searchAndFilter.songSearchString.toLowerCase());
    
    return genreSelected &&
        loveSongTypeSelected &&
        performerSelected &&
        songSelected
        ? LOVE_SONG_TYPE_COLOR_MAP[loveSongType]
        : "rgb(0, 0, 0, 0.05)";
};