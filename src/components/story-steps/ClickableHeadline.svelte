<script>
    import { onMount } from "svelte";

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

    export let headline;

    export let enterOrder = 0;
    let show = false;
    onMount(() => {
        setTimeout(() => {
            show = true;
        }, enterOrder * 50);
    });

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
{#if show}
    <li class:slideInLeft={left} class:slideInRight={right} class:slideUp={center} {style}>
        {#if $mq.desktop}
            <a href={headline.url} target="_blank">
                <img src={headline.src} alt={headline.alt} style:border-radius={'16px'} />
            </a>
        {:else}
            <img src={headline.src} alt={headline.alt} style:border-radius={'8px'} />
        {/if}
    </li>
{/if}

<style>
    li {
        list-style: none;
    }

    a {
        border: none;
    }

    img {
        object-fit: contain;
        box-shadow: 0 4px 8px rgba(75, 75, 75, 0.8);
    }
    img:hover {
        transform: perspective(1000px) rotateX(1.5deg) rotateY(1.5deg) scale(1.01);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.575);
    }


    .slideInLeft {
        animation: slide-in-left 0.8s ease-out;
    }

    .slideInRight {
        animation: slide-in-right 0.8s ease-out;
    }

    .slideUp {
        animation: slide-up 0.8s ease-out;
    }

    @keyframes slide-up {
        0% {
            margin-top: 5%;
            opacity: 0;
        }
        50% {
            margin-top: 0;
            opacity: 1;
        }
    }

    @keyframes slide-in-right {
        0% {
            margin-right: -5%;
            opacity: 0;
        }
        100% {
            margin-right: 0;
            opacity: 1;
        }
    }

    @keyframes slide-in-left {
        0% {
           margin-left: -5%;
           opacity: 0;
        }
        100% {
            margin-left: 0;
            opacity: 1;
        }
    }
</style>