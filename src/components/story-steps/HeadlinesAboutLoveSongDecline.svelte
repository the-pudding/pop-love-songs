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

    <ClickableHeadline bottom right tiltLeft headline={HEADLINES.harderToFind} />
    <ClickableHeadline top left tiltLeft headline={HEADLINES.dontWriteThemLikeTheyUsedTo} />
    <ClickableHeadline bottom left tiltRight headline={HEADLINES.generationWithoutLove} />
    <ClickableHeadline top right tiltRight headline={HEADLINES.inDecline} />
</div>

<style>
    .container {
        position: fixed;
    }
</style>