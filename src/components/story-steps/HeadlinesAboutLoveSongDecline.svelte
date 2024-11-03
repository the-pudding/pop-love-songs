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

<ul class="container" {style}>
    <ClickableHeadline center headline={HEADLINES.rip} />

    <ClickableHeadline bottom right tiltLeft headline={HEADLINES.harderToFind} />
    <ClickableHeadline bottom left tiltRight headline={HEADLINES.dontWriteThemLikeTheyUsedTo} />
    <ClickableHeadline top left tiltLeft pushUpABit headline={HEADLINES.generationWithoutLove} />
    <ClickableHeadline top right tiltRight headline={HEADLINES.inDecline} />
</ul>

<style>
    .container {
        position: fixed;
    }
</style>