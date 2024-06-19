export const SONG_DATA_COLUMNS_ENUM = {
	performers_list_str: 0,
	song: 1,
	type_and_gender_list_str: 2,
	date_as_decimal: 3,
	love_song_sub_type: 4,
	popularity_score: 5,
	total_weeks_in_top_10: 6
};

export const PERFORMER_TYPE_ABBREVIATIONS = {
	i: "individual",
	g: "group"
};

export const GENDER_ABBREVIATIONS = {
	f: "female",
	m: "male",
	n: "gender non-conforming",
	x: "mixed gender group" // OPTIMIZATION: technically this is redundant, so we could drop "g" for this in the original data
};

export const GENDER_CONSTANTS = Object.fromEntries(
	Object.entries(GENDER_ABBREVIATIONS).map(([key, value]) => [value, key])
);

// TODO: choose better name
export const LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP = {
	0: "(not a love song)",
	1: "It's Complicated",
	2: "Serenade",
	3: "Longing & Heartbreak",
	4: "Courtship & Anticipation",
	5: "Good Riddance",
	6: "Sexual Confidence", // Note: this was originally "Sexual Conquest", and still is in the original data. It's now just displayed as such.
	7: "Love Song for the Self"
};

export const LOVE_SONG_TYPE_CONSTANTS = {
	notALoveSong: 0,
	itsComplicated: 1,
	serenade: 2,
	longingAndHeartbreak: 3,
	courtshipAndAnticipation: 4,
	goodRiddance: 5,
	sexualConquest: 6,
	loveSongForTheSelf: 7
};

// TODO: bug-central: when you set an integer as a key, it gets converted to a string.
// Oddly, JS also converts an attempt to access with obj[0] to obj["0"] LOL, so it kinda works.
// ... except when you try to do things like Object.keys to get the keys, which will return strings.
// I'll try and pre-empt this by doing any such conversion here, carefully.
export const LOVE_SONG_TYPE_COLOR_MAP = {
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]: "gray",
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: "pink",
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: "blue",
	[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]: "red",
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: "brown",
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: "purple",
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: "orange",
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: "green"
};

const UNSELECTED_OPACITY = 0.2;
export const UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP = {
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]: `rgba(0, 0, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: `rgba(255, 192, 203, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: `rgba(0, 0, 255, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]: `rgba(255, 0, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: `rgba(165, 42, 42, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: `rgba(128, 0, 128, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: `rgba(255, 165, 0, ${UNSELECTED_OPACITY})`,
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: `rgba(0, 128, 0, ${UNSELECTED_OPACITY})`
};

export const LOVE_SONG_TYPES = Object.values(LOVE_SONG_TYPE_CONSTANTS);
