<script>
    import copy from "$data/copy";
	import Footer from "$components/Footer.svelte";
	import DataMethodsModal from "./DataMethodsModal.svelte";
	import mq from "$stores/mq";

    let showModal = false;
</script>

<div div class="container">
    <div class="thanks" style:max-width={$mq.desktop ? '730px' : '70%'}>
        <div>
            <h1>{copy.footer.heading}</h1>
            {@html copy.footer.thanks}

            <button class="modalTrigger" on:click={() => showModal = true}>{copy.footer.methods}</button>
        </div>
        <DataMethodsModal bind:showModal />
    </div>

    <Footer />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh; /* @michelle: what I want is for hte <Footer/> to stay pushed to the bottom of the page */        
    }

    .thanks a, .modalTrigger {
        /* So it sits on top of the nav tap regions */
        position: relative;
        z-index: 10000000;
    }

    h1 {
        font-size: 24px;
    }

    .thanks {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 48px;
    }

    .modalTrigger {
        display: block;
        margin-top: 8px;
        padding-top: 16px;
    }
</style>