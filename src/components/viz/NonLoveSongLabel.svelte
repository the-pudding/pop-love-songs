<script>

	import { LOVE_SONG_TYPE_CONSTANTS, TEXT_SHADOW_COLOR_MAP } from "$data/data-constants";
	import { currentStoryStep, isEndingSandboxStep } from "$stores/storySteps";
    import viewport from "$stores/viewport";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { nonLoveSongLabelBottomLeftCoords } from "$stores/labels";
	import { textShadow } from "$utils/styling";

    $: fontSize = $viewport.isSmallish ? 12 : 16;

    $: visible = $currentStoryStep.searchAndFilterState.visibleButNotSelectedLoveSongTypes.includes(LOVE_SONG_TYPE_CONSTANTS.notALoveSong)
    $: style = `
        left: ${$nonLoveSongLabelBottomLeftCoords.x}px; 
        top: ${$nonLoveSongLabelBottomLeftCoords.y}px; 
        font-size: ${fontSize}px; 
        text-shadow: ${textShadow(0.5, 1)};
    `;
</script>

<div class:visible={visible} {style} aria-hidden="true">
    NON-LOVE SONGS{$isEndingSandboxStep && !!$typesTreatedAsNonLoveSongs.length ? ":" : ""}
</div>

<style>
    div {
        position: fixed;
        transform: translateX(-50%);

        font-family: 'Inter', sans-serif;
        font-weight: 600;
        color: gray;
        letter-spacing: 6px;
        /* TODO: @michelle it's not working now, but I'd like this to delay and/or fade in */
        transition: opacity calc(var(--chart-transition-opacity-duration) * 1ms) ease;
        transition-delay: 800ms;

        white-space: nowrap;
    }

    div.visible {
        opacity: 1;
    }
</style>