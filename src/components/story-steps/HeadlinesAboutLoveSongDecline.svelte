<script>
	import { bottomOfStoryText } from "$stores/canvasPosition";
	import viewport from "$stores/viewport";
	import ClickableHeadline from "./ClickableHeadline.svelte";
	import { HEADLINES } from "./images";

    $: topMargin = $bottomOfStoryText
    $: style = `
        top: ${topMargin}px;
        width: 100%;
        height: ${$viewport.height - topMargin}px;
    `
</script>

<div class="container" {style}>
    <ClickableHeadline headline={HEADLINES.rip} />

    <ClickableHeadline headline={HEADLINES.harderToFind} />
    <ClickableHeadline headline={HEADLINES.dontWriteThemLikeTheyUsedTo} />
    <ClickableHeadline headline={HEADLINES.generationWithoutLove} />
    <ClickableHeadline headline={HEADLINES.inDecline} />
</div>

<style>
    
</style>