<script>
    import copy from "$data/copy.json"
    const COMMENT = {
        src: "assets/images/Boomer Bob comment.png",
        alt: `A screenshot of a comment from a user named Boomer Bob reading: ${copy.commentText.boomerBobComment}`    
    }
</script>

<img src={COMMENT.src} alt={COMMENT.alt} class="fade-in-slide-up" />

<style>
    @keyframes fadeInSlideUp {
        from {
            opacity: 0;
            transform: translate(-50%, -45%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }

    img {
        position: fixed;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: min(50%, 600px);
        max-height: 45%;
        z-index: 100;
        animation: fadeInSlideUp 1s ease-out;

        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
        border-radius: 16px;
    }
</style>