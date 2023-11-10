import {
    DATA_COLUMNS_ENUM,
    LOVE_SONG_TYPE_COLOR_MAP,
    LOVE_SONG_TYPE_BAND_LEVEL_MAP
} from "$data/data-constants.js";


const YEAR_MAX = 2022;
const YEAR_MIN = 1958;
const DOMAIN = YEAR_MAX - YEAR_MIN;

const Y_MARGIN =  50

export const getXPosition = (song, canvasWidth) => {
    const xPercentage = (song[DATA_COLUMNS_ENUM.date_as_decimal] - YEAR_MIN) / DOMAIN;
    return xPercentage * canvasWidth;
};

// TODO: use d3 scale to determine band
export const getYPosition = (song, canvasHeight) => {
    const loveSongType = song[DATA_COLUMNS_ENUM.love_song_sub_type];
    const yPercentage =
        LOVE_SONG_TYPE_BAND_LEVEL_MAP[loveSongType] /
        Object.keys(LOVE_SONG_TYPE_BAND_LEVEL_MAP).length;
    return 2 * Y_MARGIN + yPercentage * (canvasHeight - 2 * Y_MARGIN);
};

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