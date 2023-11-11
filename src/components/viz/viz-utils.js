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

const NEXT_COLOR_STEP = 50; // somewhat arbitrary, just big enough to avoid anti-alias collisions

export const getInvisibleFillFromSongIndex = (songIndex) => {
    
    const uniqueColorOffset = songIndex * NEXT_COLOR_STEP;
    const MAX_COLOR = 16777216; // 256^3
    if (uniqueColorOffset > MAX_COLOR) {
        console.error(`Too many songs to assign unique colors with a step size ${NEXT_COLOR_STEP}`);
    }
    const rgb = [];

    rgb.push(uniqueColorOffset & 0xff); // R.
    rgb.push((uniqueColorOffset & 0xff00) >> 8); // G.
    rgb.push((uniqueColorOffset & 0xff0000) >> 16); // B.
    return `rgb(${rgb.join(",")})`;
}

export const getSongIndexFromInvisibleFill = (invisibleFill) => {
    const rgb = invisibleFill;
    const rgbArray = rgb.substring(4, rgb.length - 1).split(",");
    const r = parseInt(rgbArray[0]);
    const g = parseInt(rgbArray[1]);
    const b = parseInt(rgbArray[2]);
    const uniqueColorOffset = (r) + (g << 8) + (b << 16);
    return uniqueColorOffset / NEXT_COLOR_STEP;
}

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