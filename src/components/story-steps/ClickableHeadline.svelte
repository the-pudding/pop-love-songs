<script>
    export let headline;
</script>

<a href={headline.url} target="_blank">
    <img src={headline.src} alt={headline.alt} />
</a>

<style>
    div.container {
        position: fixed;
        top: 0;
        left: 0;

        padding: 24px;
    }

    img {
        max-width: 50%;
        max-height: 50%;
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