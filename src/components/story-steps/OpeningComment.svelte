<script>
    import copy from "$data/copy.json"
    const COMMENT = {
        src: "assets/images/Boomer Bob comment.png",
        alt: `A screenshot of a comment from a user named Boomer Bob reading: ${copy.commentText.boomerBobComment}`    
    }
</script>

<img src={COMMENT.src} alt={COMMENT.alt} />

<style>
    img {
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: min(50%, 600px);
        z-index: 100;
    }
</style>