<script>
    import copy from "$data/copy";
	import Footer from "$components/Footer.svelte";
	import DataMethodsModal from "./DataMethodsModal.svelte";

    let showModal = false;
</script>

<div div class="container">
    <div>
        <h2>Thanks for reading!</h2>
        {@html copy.byline}

        <button on:click={() => showModal = true}> Read the methods here</button>
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
</style>