<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { abbreviateYearForDisplay, formatPerformersForDisplay, formatSongTitleForDisplay, formatYearForDisplay, getArrayOfPerformers } from "$data/data-utils";
	import { textShadow } from "$utils/styling";
	import viewport from "$stores/viewport";
	import { currentStoryStep } from "$stores/storySteps";

	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	
	export let song;
	export let alternateTitle = '';
	export let audioFile = false;
	export let rightAlign = false;

	let playerFocused = false;

	$: displaySongName = alternateTitle || formatSongTitleForDisplay(song[SONG_DATA_COLUMNS_ENUM.song]);
	$: rawYear = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
	$: year = $viewport.isLikelyInMobileLandscape ? abbreviateYearForDisplay(rawYear) : formatYearForDisplay(rawYear);
	$: performerNames = formatPerformersForDisplay(
		getArrayOfPerformers(song)
	);
</script>

<div class='song-and-year' style={`transform: scale(${playerFocused ? 1.1 : 1}); text-align: ${rightAlign ? 'right' : 'left'};`}>
	{#if audioFile && !rightAlign}
		<SongSnippetPlayer
			bind:playerFocused
			songName={song[SONG_DATA_COLUMNS_ENUM.song]}
			{performerNames}
			year={song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]}
			loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]}
			audioFile={audioFile} 
		/>
	{/if}
	<div class='song-title' style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '16px' : '24px'}; text-shadow: ${textShadow(2, 1)};`}>
		{displaySongName}
	</div>
	{#if audioFile && rightAlign}
		<SongSnippetPlayer
			bind:playerFocused
			songName={song[SONG_DATA_COLUMNS_ENUM.song]}
			{performerNames}
			year={song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]}
			loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]}
			audioFile={audioFile} 
		/>
	{/if}
</div>
<div class="performer" style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '14px' : '16px'}; text-shadow: ${textShadow(1, 0.5)}; text-align: ${rightAlign ? 'right' : 'left'};`}>
	<span>{performerNames}</span> (<span class='year'>{year}</span>)
</div>
{#if $currentStoryStep.showTotalWeeksInTop10InSongInfo}
	<div class='weeks-in-top-10' style={`text-shadow: ${textShadow(1, 0.5)}; text-align: ${rightAlign ? 'right' : 'left'};`}>
		<b>{song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]}</b> weeks in Top 10
	</div>
{/if}

<style>
	div {
		font-family: var(--sans);
		pointer-events: none;
	}

	.song-title {
		display: inline-block;
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
