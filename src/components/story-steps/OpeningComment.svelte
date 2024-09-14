<script>
    const COMMENT = {
        src: "assets/images/Boomer Bob comment.png",
        alt: "A screenshot of a comment from a user named Boomer Bob reading: 'Music in general has become more angry, depressing and self absorbed. Music up until about the 90's was more passionate and inspiring on many levels, including love. Its a sad statement about today's society...'"      
    }
</script>

<img src={COMMENT.src} alt={COMMENT.alt} />

<style>
    img {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        max-width: min(60%, 700px);
        z-index: 10000;
    }
</style>