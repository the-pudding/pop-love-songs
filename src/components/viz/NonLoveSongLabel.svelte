<script>
	import { isEndingSandboxStep } from "$stores/storySteps";
    import viewport from "$stores/viewport";
	import { typesTreatedAsNonLoveSongs } from "$stores/searchAndFilter";
	import { nonLoveSongLabelBottomLeftCoords } from "$stores/labels";
	import { textShadow } from "$utils/styling";

    $: fontSize = $viewport.isSmallish ? 12 : 16;

    $: style = `
        left: ${$nonLoveSongLabelBottomLeftCoords.x}px; 
        top: ${$nonLoveSongLabelBottomLeftCoords.y}px; 
        font-size: ${fontSize}px; 
        text-shadow: ${textShadow(0.5, 1)};
    `;
</script>

<div {style} aria-hidden="true">
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

        white-space: nowrap;
    }
</style>