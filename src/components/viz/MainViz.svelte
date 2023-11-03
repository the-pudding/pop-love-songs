<script>
    import data from '$data/16-EXPORT-viz-ready-data.json'
    console.log(data)

    // (key, probably doesn't live her ultimatley)
    const DATA_COLUMNS_ENUM = {
        'performer': 0,
        'song': 1,
        'generic_genre': 2,
        'gender': 3,
        'date_as_decimal': 4,
        'love_song_sub_type': 5
    }
</script>

<h2>(This will become the main viz)</h2>

The first performer in the dataset: {data[0][DATA_COLUMNS_ENUM.performer]}