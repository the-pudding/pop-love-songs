<script>
    const COMMENT = {
        src: "assets/images/music-has-declined.png",
        // TODO: better alt text (should I put the text *exactly* as it appears?)
        alt: "comment expressing a feeling that modern music is angry and depressed, a huge departure from the love songs of the past"      
    }
</script>

<img src={COMMENT.src} alt={COMMENT.alt} />

<style>
    img {
        position: fixed; 
        max-width: 45%;
        top: 40%; 
        z-index: 10000;
        left: 30%;
    }
</style>