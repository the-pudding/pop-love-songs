<script>
	import { bottomOfStoryText } from "$stores/canvasPosition";
	import viewport from "$stores/viewport";

    const headlines = {
        src: "assets/images/love song decline headlines.png",
        alt: "Screenshots of article headlines relating to the decline of love songs, such as: 'A generation without love songs', 'RIP love songs', 'love songs are in decline', 'love songs are harder to find' and 'they no longer write love songs like they used to'."
    }

    $: topMargin = $bottomOfStoryText
    $: style = `
        top: ${topMargin}px;
        width: 100%;
        height: ${$viewport.height - topMargin}px;
    `
</script>

<div class="container" {style}>
    <img {style} src={headlines.src} alt={headlines.alt} />
</div>

<style>
    div.container {
        position: fixed;
        top: 0;
        left: 0;

        padding: 24px;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        opacity: 0;
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>