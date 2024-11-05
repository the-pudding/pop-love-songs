import variables from "$data/variables.json";

export const SONG_DATA_COLUMNS_ENUM = {
	performers_list_str: 0,
	song: 1,
	date_as_decimal: 2,
	love_song_sub_type: 3,
	total_weeks_in_top_10: 4
};

export const LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP = {
	0: "Non-love song",
	1: "It's Complicated",
	2: "Serenade",
	3: "Heartache", // changed from "Longing & Heartbreak"
	4: "Pursuit", // changed from "Courtship & Anticipation"
	5: "Sexual Confidence", // changed from "Sexual Conquest"
	6: "Love Song for the Self",
	7: "Good Riddance"
};
export const LOVE_SONG_TYPE_CONSTANTS = {
	notALoveSong: 0,
	itsComplicated: 1,
	serenade: 2,
	heartache: 3,
	pursuit: 4,
	sexualConfidence: 5,
	loveSongForTheSelf: 6,
	goodRiddance: 7
};

// TODO: bug-central: when you set an integer as a key, it gets converted to a string.
// Oddly, JS also converts an attempt to access with obj[0] to obj["0"] LOL, so it kinda works.
// ... except when you try to do things like Object.keys to get the keys, which will return strings.
// I'll try and pre-empt this by doing any such conversion here, carefully.
export const LOVE_SONG_TYPE_COLOR_MAP = {
	// Note: colors are all hex values, so we can easily tack on opacity later when needed
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]: variables.color["not-a-love-song"],
	[LOVE_SONG_TYPE_CONSTANTS.serenade]: variables.color.serenade,
	[LOVE_SONG_TYPE_CONSTANTS.heartache]: variables.color["heartache"],
	[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]:
		variables.color["sexual-confidence"],
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]: variables.color["its-complicated"],
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]: variables.color["good-riddance"],
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]:
		variables.color["love-song-for-the-self"],
	[LOVE_SONG_TYPE_CONSTANTS.pursuit]: variables.color["pursuit"]
};

// TODO: actually fill this in with verified values
export const ACCESSIBLY_CONTRASTING_COLOR_MAP = {
	[LOVE_SONG_TYPE_CONSTANTS.notALoveSong]:
		variables.color["a11y-contrast"]["not-a-love-song"],
	[LOVE_SONG_TYPE_CONSTANTS.serenade]:
		variables.color["a11y-contrast"]["serenade"],
	[LOVE_SONG_TYPE_CONSTANTS.heartache]:
		variables.color["a11y-contrast"]["heartache"],
	[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]:
		variables.color["a11y-contrast"]["sexual-confidence"],
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]:
		variables.color["a11y-contrast"]["its-complicated"],
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]:
		variables.color["a11y-contrast"]["good-riddance"],
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]:
		variables.color["a11y-contrast"]["love-song-for-the-self"],
	[LOVE_SONG_TYPE_CONSTANTS.pursuit]:
		variables.color["a11y-contrast"]["pursuit"]
};

export const TEXT_SHADOW_COLOR_MAP = {
	// We don't need it for this color (and didn't set it in the variables.json file)
	// [LOVE_SONG_TYPE_CONSTANTS.notALoveSong]:
	// 	variables.color["text-shadow"]["not-a-love-song"],
	[LOVE_SONG_TYPE_CONSTANTS.serenade]:
		variables.color["text-shadow"]["serenade"],
	[LOVE_SONG_TYPE_CONSTANTS.heartache]:
		variables.color["text-shadow"]["heartache"],
	[LOVE_SONG_TYPE_CONSTANTS.sexualConfidence]:
		variables.color["text-shadow"]["sexual-confidence"],
	[LOVE_SONG_TYPE_CONSTANTS.itsComplicated]:
		variables.color["text-shadow"]["its-complicated"],
	[LOVE_SONG_TYPE_CONSTANTS.goodRiddance]:
		variables.color["text-shadow"]["good-riddance"],
	[LOVE_SONG_TYPE_CONSTANTS.loveSongForTheSelf]:
		variables.color["text-shadow"]["love-song-for-the-self"],
	[LOVE_SONG_TYPE_CONSTANTS.pursuit]: variables.color["text-shadow"]["pursuit"]
};
const HEX_OPACITY_POSTFIX = "40"; // 25% opacity
export const UNSELECTED_LOVE_SONG_TYPE_COLOR_MAP = Object.fromEntries(
	Object.entries(LOVE_SONG_TYPE_COLOR_MAP).map(([key, value]) => [
		key,
		`${value}${HEX_OPACITY_POSTFIX}`
	])
);

export const LOVE_SONG_TYPES = Object.values(LOVE_SONG_TYPE_CONSTANTS);
