<script>
    import copy from '$data/copy.json';
</script>

<section>
    <h1>Is the love song dying?</h1>
    <p>{@html copy.byline}</p>
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
</style>