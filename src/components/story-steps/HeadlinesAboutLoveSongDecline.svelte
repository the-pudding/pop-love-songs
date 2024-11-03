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
    <ClickableHeadline center headline={HEADLINES.rip} />

    <ClickableHeadline top left headline={HEADLINES.harderToFind} />
    <ClickableHeadline top right headline={HEADLINES.dontWriteThemLikeTheyUsedTo} />
    <ClickableHeadline bottom left headline={HEADLINES.generationWithoutLove} />
    <ClickableHeadline bottom right headline={HEADLINES.inDecline} />
</div>

<style>
    .container {
        position: fixed;
    }
</style>