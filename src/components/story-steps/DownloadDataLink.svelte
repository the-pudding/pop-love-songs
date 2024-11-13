<script>
    import copy from "$data/copy.json";
	import { SONG_DATA_COLUMNS_ENUM, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP, LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
    import songsData from "$data/songs-data.js";

    const loveSongType = song => {
        const type = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
        if (type === LOVE_SONG_TYPE_CONSTANTS.notALoveSong) {
            return "" // just make the download a bit smaller
        }
        return LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]];
    }

    // Note: these must match the order as the actual data in stringifyDatum
    const userFriendlyColumnNames = [
        'song_title', // SONG_DATA_COLUMNS_ENUM.song,
        'pipe_delimited_artist_list', // SONG_DATA_COLUMNS_ENUM.performers_list_str,
        'love_song_category', // SONG_DATA_COLUMNS_ENUM.love_song_sub_type,

        'top_10_debut_date_as_decimal', // SONG_DATA_COLUMNS_ENUM.date_as_decimal,
        
        'total_weeks_in_top_10', // SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10,
    ]

    const escapeCsvField = field => `"${String(field).replace(/"/g, '""')}"`;

    const stringifyDatum = ({song}) => ([
        escapeCsvField(song[SONG_DATA_COLUMNS_ENUM.song]),
        escapeCsvField(song[SONG_DATA_COLUMNS_ENUM.performers_list_str]),
        loveSongType(song),
        
        song[SONG_DATA_COLUMNS_ENUM.date_as_decimal],
        
        song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10],
    ])

    const csvDownload = data => {
        const header = userFriendlyColumnNames.join(",");
        const csv = [header, ...data.map(stringifyDatum)].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        return URL.createObjectURL(blob);
    }
</script>

<a aria-label="Download the full dataset from this article" href={csvDownload(songsData)} download={copy.dataDownloadFileName}>
    <slot />
</a>

<style>
    a {
        background: none;
        font-weight: bold;
        border-bottom: 2px solid var(--color-good-riddance);
        padding: 0px;

        transform: scale(1);
        transition: transform 0.2s;
    }

    a:hover {
		border-bottom: 2px solid var(--color-heartache);
		transform: scale(1.02);
	}
</style>