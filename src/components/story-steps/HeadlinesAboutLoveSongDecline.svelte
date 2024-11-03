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
    <ClickableHeadline center big headline={HEADLINES.rip} />

    <ClickableHeadline top left tiltLeft headline={HEADLINES.harderToFind} />
    <ClickableHeadline top right tiltRight headline={HEADLINES.dontWriteThemLikeTheyUsedTo} />
    <ClickableHeadline bottom left tiltRight headline={HEADLINES.generationWithoutLove} />
    <ClickableHeadline bottom right tiltLeft headline={HEADLINES.inDecline} />
</div>

<style>
    .container {
        position: fixed;
    }
</style>