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

<ul aria-label="Headlines discussing the decline of love songs" class="container" {style}>

    <ClickableHeadline bottom right tiltLeft enterOrder={0} headline={HEADLINES.harderToFind} />
    <ClickableHeadline bottom left tiltRight enterOrder={1} headline={HEADLINES.dontWriteThemLikeTheyUsedTo} />
    <ClickableHeadline top left tiltLeft pushUpABit enterOrder={2} headline={HEADLINES.generationWithoutLove} />
    <ClickableHeadline top right tiltRight enterOrder={3} headline={HEADLINES.inDecline} />

    <ClickableHeadline center enterOrder={4} headline={HEADLINES.rip} />
</ul>

<style>
    .container {
        position: fixed;
    }
</style>