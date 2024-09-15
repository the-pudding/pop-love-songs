<script>
    import copy from '$data/copy.json';

    const faces = {
        src: "assets/images/elvis and olivia rodrigo.png",
        alt: "Elvis Presley, smiling, and Olivia Rodrigo, scowling, side by side."
    }
</script>

<section>
    <img src={faces.src} alt={faces.alt} />
    <h1>Is the<br>love song<br>dying?</h1>
    <p class="by-line">{@html copy.byline}</p>
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

    img {
        position: fixed;
        top: 0;
        left: 0;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    h1, .by-line {
        z-index: 500;
    }

    h1 {
        font-family: var(--sans);
        font-weight: bold;
        font-size: 108px;
        text-align: center;
        text-shadow: 12px 12px 1px white,
			-12px -12px 1px white,
			12px -12px 1px white,
			-12px 12px 1px white;
         /* -webkit-text-stroke: 12px red */
    }

    .by-line {
        font-family: var(--sans);
        font-size: 24px;
        font-weight: 300;
    }
</style>