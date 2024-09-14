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
        max-width: 45%;
        top: 40%; 
        z-index: 10000;
        left: 30%;
    }
</style>