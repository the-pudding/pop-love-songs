<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { abbreviateYearForDisplay, formatSongTitleForDisplay, formatYearForDisplay } from "$data/data-utils";
	import { textShadow } from "$utils/styling";
	import viewport from "$stores/viewport";
	import { currentStoryStep } from "$stores/storySteps";

	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;
	export let alternateTitle = '';
	export let audioFile = false;
	export let rightAlign = false;

	$: displaySongName = alternateTitle || formatSongTitleForDisplay(song[SONG_DATA_COLUMNS_ENUM.song]);
	$: rawYear = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
	$: year = $viewport.isLikelyInMobileLandscape ? abbreviateYearForDisplay(rawYear) : formatYearForDisplay(rawYear);

</script>

<div class='song-and-year' style={`text-align: ${rightAlign ? 'right' : 'left'};`}>
	{#if audioFile && !rightAlign}
		<SongSnippetPlayer songName={song[SONG_DATA_COLUMNS_ENUM.song]} year={song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]} loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]} audioFile={audioFile} />
	{/if}
	<strong class='song' style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '16px' : '24px'}; text-shadow: ${textShadow(2, 1)};`}>
		{displaySongName}
	</strong>
	{#if audioFile && rightAlign}
		<SongSnippetPlayer songName={song[SONG_DATA_COLUMNS_ENUM.song]} year={song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]} loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]} audioFile={audioFile} />
	{/if}
</div>
<div class="performer" style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '14px' : '16px'}; text-shadow: ${textShadow(1, 0.5)}; text-align: ${rightAlign ? 'right' : 'left'};`}>
	<PerformerNames {song} />  (<span class='year'>{year}</span>)
</div>
{#if $currentStoryStep.showTotalWeeksInTop10InSongInfo}
	<div class='weeks-in-top-10' style={`text-shadow: ${textShadow(1, 0.5)}; text-align: ${rightAlign ? 'right' : 'left'};`}>
		<b>{song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]}</b> weeks in Top 10
	</div>
{/if}

<style>
	div, strong {
		font-family: var(--sans), sans-serif;
		pointer-events: none;
	}

	.song {
		font-weight: bold;
		text-transform: uppercase;
	}
	
	.performer, .song-and-year {
		white-space: nowrap;
	}

	.year, .performer, .weeks-in-top-10 {
		font-weight: 400;
	}
</style>
