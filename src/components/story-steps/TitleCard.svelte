<script>
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import copy from '$data/copy.json';
    import viewport from '$stores/viewport';
    import { textShadow } from '$utils/styling';
    import { TITLE_CARD_BACKGROUND_IMAGE } from './images';

    const DYING_OPACITIES = {
        d: 1,
        y: 0.8,
        i: 0.6,
        n: 0.4,
        g: 0.2,
        '?': 0
    };

    const characters = Array.from("dying?");
    const dyingTweenArray = tweened(
        characters.map((_, index) => 1), 
        { duration: 2000, easing: cubicOut }
    );

    const gradientOpacity = tweened(1, { delay: 1000, duration: 2000, easing: cubicOut });

    onMount(() => {
        const tweenTarget = characters.map((char) => DYING_OPACITIES[char]);
        dyingTweenArray.set(tweenTarget);
        gradientOpacity.set(0);
    });

    $: h1Style = `
        font-size: ${$viewport.isSmallish ? '56px' : '108px'};
        line-height: ${$viewport.isSmallish ? '56px' : '116px'};
        text-shadow: ${textShadow(4, 0.5)};
    `;
</script>

<section>
    <div class='background-image' aria-label={TITLE_CARD_BACKGROUND_IMAGE.alt} role="img" style={`background-image: url(${TITLE_CARD_BACKGROUND_IMAGE.src.replaceAll(' ', '%20')});`} />
    
    <div class="gradient" style={`opacity: ${$gradientOpacity};`} />

    <h1 style={h1Style} aria-label="Is the love song dying?">
        <span aria-hidden="true">Is the<br>love song<br></span>
        {#each characters as character, index}
            <span class={character} style={`-webkit-text-fill-color: rgba(0, 0, 0, ${$dyingTweenArray[index]}); display: inline-block; width: auto;`} aria-hidden="true">
                {character}
            </span>
        {/each}
    </h1>

    <p class="by-line" style:font-size={$viewport.isSmallish ? '16px' : '24px'}>
        {@html copy.byline}
    </p>
</section>

<style>
    section {
        top: 0;
        position: fixed;
        left: 0;
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .background-image { 
        position: fixed;

        height: 100%; 
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .gradient {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 30%, var(--color-cream-background) 50%);
        z-index: 400;
    }

    h1, .by-line {
        z-index: 500;
    }

    h1 > span {
        -webkit-text-fill-color: black;
        text-shadow: none;
        -webkit-text-stroke: 2px black;
    }

    h1 {
        font-family: var(--sans);
        font-weight: bold;
        text-align: center;
    }

    .by-line {
        font-family: var(--sans);
        font-weight: 300;
    }
</style>