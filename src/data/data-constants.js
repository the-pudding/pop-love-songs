export const SONG_DATA_COLUMNS_ENUM = {
	performers_list_str: 0,
	song: 1,
	date_as_decimal: 2,
	love_song_sub_type: 3,
	total_weeks_in_top_10: 4
};

export const PERFORMER_TYPE_ABBREVIATIONS = {
	i: "individual",
	g: "group"
};

// TODO: choose better name
// Note: originally Sexual Confidence was originally called "Sexual Conquest"
export const LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP = {
	0: "(not a love song)",
	1: "It's Complicated",
	2: "Serenade",
	3: "Longing & Heartbreak",
	4: "Courtship & Anticipation",
	5: "Sexual Confidence",
	6: "Love Song for the Self",
	7: "Good Riddance"
};
export const LOVE_SONG_TYPE_CONSTANTS = {
	notALoveSong: 0,
	itsComplicated: 1,
	serenade: 2,
	longingAndHeartbreak: 3,
	courtshipAndAnticipation: 4,
	sexualConfidence: 5,
	loveSongForTheSelf: 6,
	goodRiddance: 7
};

// TODO: bug-central: when you set an integer as a key, it gets converted to a string.
// Oddly, JS also converts an attempt to access with obj[0] to obj["0"] LOL, so it kinda works.
// ... except when you try to do things like Object.keys to get the keys, which will return strings.
// I'll try and pre-empt this by doing any such conversion here, carefully.
export const LOVE_SONG_TYPE_COLOR_MAP = {
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]: "#D1D1D1",
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: "#F2C3FF",
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: "#5CAFFF",
	[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]: "#FF5C00",
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: "#96753C",
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: "#A290E9",
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: "#FFD700",
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: "#02D098"
};

// TODO: actually fill this in with verified values
export const ACCESSIBLY_CONTRASTING_COLOR_MAP = {
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]: "#000000",
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: "#000000",
	[LOVE_SONG_TYPE_CONSTANTS.longingAndHeartbreak]: "#000000",
	[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]: "#000000",
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: "white",
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: "#000000",
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]: "#000000",
	[LOVE_SONG_TYPE_CONSTANTS.courtshipAndAnticipation]: "#000000"
};

export const COLORS = {
	background: "#fff6df"
};

const FORTY_PERCENT_OPACITY_HEX_POSTFIX = "66"; // 40% opacity
export const UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP = Object.fromEntries(
	Object.entries(LOVE_SONG_TYPE_COLOR_MAP).map(([key, value]) => [
		key,
		`${value}${FORTY_PERCENT_OPACITY_HEX_POSTFIX}`
	])
);

export const LOVE_SONG_TYPES = Object.values(LOVE_SONG_TYPE_CONSTANTS);
