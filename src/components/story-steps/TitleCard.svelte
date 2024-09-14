<script>
    import copy from '$data/copy.json';
</script>

<section>
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