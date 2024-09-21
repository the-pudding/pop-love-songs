<script>
	import {
		SONG_DATA_COLUMNS_ENUM,
	} from "$data/data-constants.js";
	import { formatSongTitleForDisplay, formatYearForDisplay } from "$data/data-utils";
	import { textShadow } from "$utils/styling";
	import viewport from "$stores/viewport";
	import { currentStoryStep } from "$stores/storySteps";

	import SongSnippetPlayer from "../audio/SongSnippetPlayer.svelte";
	import PerformerNames from "./PerformerNames.svelte";
	
	export let song;
	export let alternateTitle = '';
	export let audioFile = false;

	
	$: displaySongName = alternateTitle || formatSongTitleForDisplay(song[SONG_DATA_COLUMNS_ENUM.song]);
	$: year = formatYearForDisplay(song[SONG_DATA_COLUMNS_ENUM.date_as_decimal]);

</script>

<div class='song-and-year'>
	<strong class='song' style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '16px' : '24px'}; text-shadow: ${textShadow(2, 1)};`}>
		{displaySongName}
	</strong>
	
	{#if audioFile}
		<SongSnippetPlayer songName={song[SONG_DATA_COLUMNS_ENUM.song]} loveSongType={song[SONG_DATA_COLUMNS_ENUM.love_song_sub_type]} audioFile={audioFile} />
	{/if}
</div>
<div class="performer" style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '12px' : '16px'}; text-shadow: ${textShadow(1, 0.5)};`}>
	<PerformerNames {song} />  (<span class='year' style={`font-size: ${$viewport.isLikelyInMobileLandscape ? '12px' : '16px'}`}>{year}</span>)
</div>
{#if $currentStoryStep.showTotalWeeksInTop10InSongInfo}
	<div class='weeks-in-top-10' style={`text-shadow: ${textShadow(1, 0.5)}`}>
		<b>{song[SONG_DATA_COLUMNS_ENUM.total_weeks_in_top_10]}</b> weeks in the Top 10
	</div>
{/if}

<style>
	div, strong {
		font-family: var(--sans), sans-serif;
		pointer-events: none;
	}

	.song-and-year {
		white-space: nowrap;
	}

	.song {
		font-weight: bold;
		text-transform: uppercase;
	}

	.year, .performer, .weeks-in-top-10 {
		font-weight: 300;
	}
</style>
