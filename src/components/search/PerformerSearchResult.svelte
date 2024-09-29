<script>
    export let result;

    $: name = result.name;
    
    $: songCountByLoveSongType = {
        "Serenade": 12,
        "Not a Love Song": 31
    }
    $: songCount = Object.values(songCountByLoveSongType).reduce((acc, count) => acc + count, 0)
</script>

<div class="performer-search-result">
        <!-- @michelle: what is the best html tags to use here? like is it better to wrap the name (primary info) in an h2 vs a div? -->
        <div class="top-row">
            <h2>{name}</h2>
            <p>{songCount} hits</p>
        </div>
        <ul>
            {#each Object.entries(songCountByLoveSongType) as [type, count]}
                <li>{type}: {count}</li>
            {/each}
        </ul>
</div>

<style>
    .top-row {
        display: flex;
        justify-content: space-between;
    }

    .top-row {
        flex: 1;
    }
    .top-row h2 {
        margin: 0;
        font-size: 1.2em;
    }
    .top-row p {
        margin: 0;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li {
        font-size: 0.9em;
    }
</style>