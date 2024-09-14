<script>
	import { Y_MARGIN_SCREEN_PERCENTAGE } from "$data/data-utils";
	import viewport from "$stores/viewport";
	import { STORY_STEP_CONTROLLER_TOP_PADDING } from "../viz/viz-utils";

    const BOOMER_BOB_IMAGES = {
        headlines: {
            src: "assets/images/love song decline headlines.png",
            alt: "Screenshots of article headlines reading: 'A generation without love songs', 'RIP love songs', or 'they no longer write love songs like they used to'."
        }
    }

    $: topMargin = STORY_STEP_CONTROLLER_TOP_PADDING + ($viewport.height * Y_MARGIN_SCREEN_PERCENTAGE)
    $: console.log({topMargin})
    $: style = `
        height: ${$viewport.height - topMargin}px;
    `
</script>

<div class="container">
    <img {style} src={BOOMER_BOB_IMAGES.headlines.src} alt={BOOMER_BOB_IMAGES.headlines.alt} />
</div>

<style>
    div.container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        position: fixed; 
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>