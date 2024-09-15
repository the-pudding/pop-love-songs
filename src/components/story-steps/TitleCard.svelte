<script>
    import copy from '$data/copy.json';
	import viewport from '$stores/viewport';

    const faces = {
        src: "assets/images/elvis and olivia rodrigo.png",
        alt: "Elvis Presley, smiling, and Olivia Rodrigo, scowling, side by side."
    }
</script>

<section>
    <div class='background-image' aria-label={faces.alt} role="img" style={`background: url(${faces.src.replaceAll(' ', '%20')}) no-repeat center center fixed;`} />
    <!-- @michelle: I'm overall a bit unsure where best to deploy $viewport vs CSS media query. Does viewport offer an advantage that it's *actual* screen size? -->
    <h1 style:font-size={$viewport.isMobileLandscapeWidth ? '64px' : '108px'} style:line-height={$viewport.isMobileLandscapeWidth ? '72px' : '116px'}>
        Is the<br>love song<br>dying?
    </h1>
    <p class="by-line" style:font-size={$viewport.isMobileLandscapeWidth ? '16px' : '24px'}>
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

    h1 {
        font-family: var(--sans);
        font-weight: bold;
        text-align: center;
        text-shadow: 
            6px 6px 0.5px white,
            -6px -6px 0.5px white,
            6px -6px 0.5px white,
            -6px 6px 0.5px white,
            6px 0px 0.5px white,
            -6px 0px 0.5px white,
            0px 6px 0.5px white,
            0px -6px 0.5px white;
    }

    .by-line {
        font-family: var(--sans);
        font-weight: 300;
    }
</style>