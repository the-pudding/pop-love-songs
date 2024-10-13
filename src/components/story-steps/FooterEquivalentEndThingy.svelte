<script>
    import copy from "$data/copy";
	import Footer from "$components/Footer.svelte";
	import DataMethodsModal from "./DataMethodsModal.svelte";

    let showModal = false;
</script>

<div div class="container">
    <div class="thanks">
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

    h1 {
        font-size: 24px;
    }

    .thanks {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 48px;
        max-width: 730px;
    }

    .modalTrigger {
        display: block;
        margin-top: 24px;
    }
</style>