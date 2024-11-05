<script>
    import copy from "$data/copy.json";
	import { SONG_DATA_COLUMNS_ENUM, LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP, LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";
    import songsData from "$data/songs-data.js";
	import csvDownload from "$utils/csvDownload";

    const loveSongType = song => {
        const type = song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type];
        if (type === LOVE_SONG_TYPE_CONSTANTS.notALoveSong) {
            return "" // just make the download a bit smaller
        }
        return LOVE_SONG_TYPE_TO_DISPLAY_TEXT_MAP[song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]];
    }

    const formattedData = songsData.map(({song}) => ({
        performers_list_str: song[SONG_DATA_COLUMNS_ENUM.performers_list_str],
        song: song[SONG_DATA_COLUMNS_ENUM.song],
        date_as_decimal: song[SONG_DATA_COLUMNS_ENUM.date_as_decimal],
        loveSongType: loveSongType(song),
        total_weeks_in_top_10: song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10],
    }));
</script>

<a aria-label="Download the full dataset from this article" href={csvDownload(formattedData)} download={copy.dataDownloadFileName}>
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