<script>
	import Modal from '../helpers/Modal.svelte';
    import copy from "$data/copy.json";
    
    const { dataMethods } = copy;

    export let buttonText = 'show modal';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}>{buttonText}</button>

<Modal bind:showModal>
	<h1>Data Methods</h1>
    
    <!-- Iterate over dataMethods -->
    {#each dataMethods as {title, paragraphs}}
        <h2>{title}</h2>
        {#each paragraphs as paragraph}
            <p>{@html paragraph}</p>
        {/each}
    {/each}
</Modal>
