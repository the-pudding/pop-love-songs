<script>
    const BOOMER_BOB_IMAGES = {
        decline: {
            src: "assets/images/love songs are in decline.png",
            alt: "article heading stating 'love song's are in decline but at least Pharrell's happy'"
        },
        rip: {
            src: "assets/images/love songs, rip.png",
            alt: "article heading stating 'love songs, rip'"
        }
    }
</script>

<!-- @michelle: is this the preferred way to load images? I saw a loadImage function -->
<img class="decline" src={BOOMER_BOB_IMAGES.decline.src} alt={BOOMER_BOB_IMAGES.decline.alt} />
<img class="rip" src={BOOMER_BOB_IMAGES.rip.src} alt={BOOMER_BOB_IMAGES.rip.alt} />

<style>
    img {
        position: fixed; 
        max-width: 45%;
        top: 0; 
        z-index: 10000;
    }

    img.decline {
        left: 0;
    }

    img.rip {
        left: 50%;
    }
</style>