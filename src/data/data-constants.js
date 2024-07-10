export const SONG_DATA_COLUMNS_ENUM = {
	performers_list_str: 0,
	song: 1,
	type_and_gender_list_str: 2,
	date_as_decimal: 3,
	love_song_sub_type: 4,
	total_weeks_in_top_10: 5
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
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]: "#D1D1D1",
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: "#F2C3FF",
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: "#5CAFFF",
	[LOVE_SONG_TYPE_CONSTANTS.sexualConquest]: "#FF5C00",
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: "#96753C",
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: "#A290E9",
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: "#FFD700",
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: "#02D098"
};

const UNSELECTED_OPACITY_HEX_PREFIX = "4D"; // 30% opacity
export const UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP = Object.fromEntries(
	Object.entries(LOVE_SONG_TYPE_COLOR_MAP).map(([key, value]) => [
		key,
		`${value}${UNSELECTED_OPACITY_HEX_PREFIX}`
	])
);

export const LOVE_SONG_TYPES = Object.values(LOVE_SONG_TYPE_CONSTANTS);
