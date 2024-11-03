<script>
	import mq from "$stores/mq";
	import viewport from "$stores/viewport";

    export let center = false;
    export let top = false; 
    export let bottom = false;
    export let left = false;
    export let right = false;

    export let pushUpABit = false;

    export let tiltLeft = false;
    export let tiltRight = false;

    export let big = false;

    export let headline;

    $: marginPercent = $mq.desktop ? 5 : 3;
    $: viewportIsNarrow = 0.7 * $viewport.width < $viewport.height;
    $: style = `
        position: absolute;
        ${center ? 'top: 50%; left: 50%; transform: translate(-50%, -50%);' : ''}
        ${top ? `top: ${marginPercent - (pushUpABit ? 7 : 0)}%;` : ''}
        ${bottom ? `bottom: ${marginPercent}%;` : ''}
        ${left ? `left: ${marginPercent}%;` : ''}
        ${right ? `right: ${marginPercent}%;` : ''}
        ${tiltLeft ? 'transform: rotate(-8deg);' : ''}
        ${tiltRight ? 'transform: rotate(8deg);' : ''}
        ${viewportIsNarrow && center ? 'width: 80%;' : 'max-width: 42%;'}
        z-index: ${center ? 1 : 0};
    `;

    
</script>

<!-- TODO: test with screen reader -->
 <li {style}>
    {#if $mq.desktop}
        <a href={headline.url} target="_blank">
            <img src={headline.src} alt={headline.alt} />
        </a>
    {:else}
        <img src={headline.src} alt={headline.alt} />
    {/if}
</li>

<style>
    li {
        list-style: none;
    }

    a {
        border: none;
    }

    img {
        object-fit: contain;
    }
    img:hover {
        transform: perspective(1000px) rotateX(1.5deg) rotateY(1.5deg) scale(1.01);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.575);
    }
</style>