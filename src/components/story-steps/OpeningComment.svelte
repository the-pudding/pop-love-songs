<script>
	import { BOOMER_BOB_COMMENT_IMAGE } from "./images";
</script>

<img src={BOOMER_BOB_COMMENT_IMAGE.src} alt={BOOMER_BOB_COMMENT_IMAGE.alt} class="fade-in-slide-up" />

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