<script>
	import Modal from '../helpers/Modal.svelte';
    import copy from "$data/copy.json";
    
    const { dataMethods } = copy;

    export let showModal = false; // boolean
</script>

<Modal bind:showModal>
	<h1 slot="header">Data Methods</h1>
    
    <!-- Iterate over dataMethods -->
    {#each dataMethods as {title, paragraphs}}
        <h2>{title}</h2>
        {#each paragraphs as paragraph}
            <p>{@html paragraph}</p>
        {/each}
    {/each}
</Modal>
