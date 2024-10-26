<script>
	import { performerSearchString } from "$stores/searchAndFilter";
	import { isEndingSandboxStep } from "$stores/storySteps";
	import SearchResultText from "./SearchResultText.svelte";
	import SongTypeSparkline from "./SongTypeSparkline.Chart.svelte";

    export let result;

    $: name = result.name;
    
    $: songCountByLoveSongType = result.songCountByLoveSongType;
    $: totalSongCount = result.totalSongCount;
</script>

<div class="performer-search-result" aria-hidden="true">
        <div class="top-row">
            <h2>
                <SearchResultText fullText={name} query={$performerSearchString} />
            </h2>
            <p><b>{totalSongCount}</b> songs</p>
        </div>
        {#if $isEndingSandboxStep}
            <SongTypeSparkline {totalSongCount} {songCountByLoveSongType} />
        {/if}
</div>

<style>
    .performer-search-result {
        font-family: var(--sans);
        font-size: 12px;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .top-row {
        display: flex;
        justify-content: space-between;
    }

    .top-row {
        flex: 1;
    }
    .top-row h2 {
        margin: 0;
        padding: 0;
        font-size: 16px;
    }
    .top-row p {
        margin: 0;
    }
</style>