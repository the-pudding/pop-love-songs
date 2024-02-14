export const SONG_DATA_COLUMNS_ENUM = {
	performers_list_str: 0,
	song: 1,
	generic_genre: 2,
	gender: 3,
	date_as_decimal: 4,
	love_song_sub_type: 5,
	popularity_score: 6
};

export const LOVE_SONG_TYPE_COLOR_MAP = {
	"": "gray",
	Serenade: "pink",
	"Longing & Heartbreak": "blue",
	"Sexual Conquest": "red",
	"It's Complicated": "brown",
	"Good Riddance": "purple",
	"Love Song for the Self": "orange",
	"Platonic Love": "yellow",
	// New categories:
	"Courtship & Anticipation": "green"
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
