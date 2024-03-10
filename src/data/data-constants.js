export const SONG_DATA_COLUMNS_ENUM = {
	performers_list_str: 0,
	song: 1,
	generic_genre: 2,
	gender: 3,
	date_as_decimal: 4,
	love_song_sub_type: 5,
	popularity_score: 6
};

export const LOVE_SONG_TYPE_CONSTANTS = {
	serenade: "Serenade",
	longingAndHeartbreak: "Longing & Heartbreak",
	sexualConquest: "Sexual Conquest",
	itsComplicated: "It's Complicated",
	goodRiddance: "Good Riddance",
	loveSongForTheSelf: "Love Song for the Self",
	platonicLove: "Platonic Love",
	courtshipAndAnticipation: "Courtship & Anticipation"
};

export const LOVE_SONG_TYPE_COLOR_MAP = {
	"": "gray",
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: "pink",
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: "blue",
	[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]: "red",
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: "brown",
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: "purple",
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: "orange",
	[LOVE_SONG_TYPE_CONSTANTS.platonicLove]: "yellow",
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: "green"
};

const UNSELECTED_OPACITY = 0.2;
export const UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP = {
	"": `rgba(0, 0, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: `rgba(255, 192, 203, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: `rgba(0, 0, 255, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_COLOR_MAP.sexualConquest]: `rgba(255, 0, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: `rgba(165, 42, 42, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: `rgba(128, 0, 128, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: `rgba(255, 165, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.platonicLove]: `rgba(255, 255, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: `rgba(0, 128, 0, ${UNSELECTED_OPACITY})`
};

export const LOVE_SONG_TYPES = Object.keys(LOVE_SONG_TYPE_COLOR_MAP);

export const LOVE_SONG_TYPE_BAND_LEVEL_MAP = {
	"": 0,
	Serenade: 1,
	"Longing & Heartbreak": 2,
	"Sexual Conquest": 3,
	"It's Complicated": 4,
	"Good Riddance": 5,
	"Courtship & Anticipation": 6,
	"Love Song for the Self": 7,
	"Platonic Love": 8
};

export const GENDDER_CONSTANTS = {
	female: "f",
	male: "m",
	otherOrMixed: "x"
};
