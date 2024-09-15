<script>
    import copy from '$data/copy.json';
	import viewport from '$stores/viewport';
	import { textShadow } from '../utils';

    const faces = {
        src: "assets/images/elvis and olivia rodrigo.png",
        alt: "Elvis Presley, smiling, and Olivia Rodrigo, scowling, side by side."
    }

    const DYING_OPACITIES = {
        d: 1,
        i: 0.9,
        y: 0.8,
        i: 0.6,
        n: 0.4,
        g: 0.2,
        '?': 0
    }

    $: h1Style = `
        font-size: ${$viewport.isLikelyInMobileLandscape ? '64px' : '108px'};
        line-height: ${$viewport.isLikelyInMobileLandscape ? '72px' : '116px'};
        text-shadow: ${textShadow(6, 6, 0.5, 'white')};
    `;
</script>

<section>
    <div class='background-image' aria-label={faces.alt} role="img" style={`background: url(${faces.src.replaceAll(' ', '%20')}) no-repeat center center fixed;`} />
    
    <!-- @michelle: I'm overall a bit unsure where best to deploy $viewport vs CSS media query. Does viewport offer an advantage that it's *actual* screen size? -->
    <h1 style={h1Style}>
        Is the<br>love song<br>
        {#each Array.from("dying?") as character}
            <span class={character} style={`-webkit-text-fill-color: rgba(0, 0, 0, ${DYING_OPACITIES[character]}); display: inline-block; width: auto;`}>
                {character}
            </span>
        {/each}
    </h1>

    <p class="by-line" style:font-size={$viewport.isLikelyInMobileLandscape ? '16px' : '24px'}>
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
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    h1, .by-line {
        z-index: 500;
    }

    h1 > span {
        -webkit-text-fill-color: rgba(0, 0, 0, 0.786);
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