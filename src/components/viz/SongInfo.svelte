<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { abbreviateYearForDisplay, formatPerformersForDisplay, formatSongTitleForDisplay, formatYearForDisplay, getArrayOfPerformers } from "$data/data-utils";
	import { textShadow } from "$utils/styling";
	import viewport from "$stores/viewport";
	import { currentStoryStep, isEndingSandboxStep } from "$stores/storySteps";

	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	import LoveSongTypePill from "$components/search/LoveSongTypePill.svelte";
	
	export let song;
	export let alternateTitle = '';
	export let noWrapTitle = false;
	export let audioFile = false;
	export let rightAlign = false;

	let playerFocused = false;

	$: displaySongName = alternateTitle || formatSongTitleForDisplay(song[SONG_DATA_COLUMNS_ENUM.song]);
	$: rawYear = song[SONG_DATA_COLUMNS_ENUM.date_as_decimal];
	$: year = $viewport.isLikelyInMobileLandscape ? abbreviateYearForDisplay(rawYear) : formatYearForDisplay(rawYear);
	$: performerNames = formatPerformersForDisplay(
		getArrayOfPerformers(song)
	);

	$: ariaLabel = `"${displaySongName}" by ${performerNames} (released ${Math.floor(rawYear)})${$currentStoryStep.showTotalWeeksInTop10InSongInfo ? `, ${song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]} weeks in Top 10` : ''}`
</script>

<!-- For more efficient screen reading UX, we hve the audio player (when it exists) provide the aria-label, rather than having to land first on the parent with the aria-label, then descend to the button -->
<div aria-label={audioFile ? '' : ariaLabel}>
	<div class='song-and-player-wrapper' style={`transform: scale(${playerFocused ? 1.05 : 1}); justify-content: ${rightAlign ? 'end' : 'start'};`}>
		{#if audioFile && !rightAlign}
			<SongSnippetPlayer
				bind:playerFocused
				{ariaLabel}
				songName={song[SONG_DATA_COLUMNS_ENUM.song]}
				year={song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]}
				loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]}
				audioFile={audioFile}
			/>
		{/if}
		<div aria-hidden="true" class='song-title' style={`
			font-size: ${$viewport.isLikelyInMobileLandscape ? '16px' : '24px'}; 
			text-shadow: ${textShadow(2, 1)}; 
			${noWrapTitle ? 'white-space: nowrap; ' : ''} 
			margin-${rightAlign ? 'right' : 'left'}: 6px;
		`}>
			{displaySongName}
		</div>
		{#if audioFile && rightAlign}
			<SongSnippetPlayer
				bind:playerFocused
				{ariaLabel}
				songName={song[SONG_DATA_COLUMNS_ENUM.song]}
				year={song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]}
				loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]}
				audioFile={audioFile} 
			/>
		{/if}
	</div>
	<div aria-hidden="true" class="performer" style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '14px' : '16px'}; text-shadow: ${textShadow(1, 0.5)}; text-align: ${rightAlign ? 'right' : 'left'};`}>
		<span>{performerNames}</span> (<span class='year'>{year}</span>)
	</div>
	{#if $isEndingSandboxStep}
		<div aria-hidden="true" class='love-song-type' style:justify-content={`${rightAlign ? 'flex-end' : 'flex-start'}`}>
			<LoveSongTypePill loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]} />
		</div>
	{/if}
	{#if $currentStoryStep.showTotalWeeksInTop10InSongInfo}
		<div aria-hidden="true" class='weeks-in-top-10' style={`text-shadow: ${textShadow(1, 0.5)}; text-align: ${rightAlign ? 'right' : 'left'};`}>
			<b>{song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]}</b> weeks in Top 10
		</div>
	{/if}
</div>

<style>
	div {
		font-family: var(--sans);
	}

	.song-and-player-wrapper {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}

	.song-title {
		display: inline-block;
		font-weight: bold;
		text-transform: uppercase;
		max-width: 45vw;
	}

	.year, .performer, .weeks-in-top-10 {
		font-weight: 400;
	}

	.performer {
		white-space: nowrap;
	}

	.love-song-type {
		display: flex;
	}
</style>
