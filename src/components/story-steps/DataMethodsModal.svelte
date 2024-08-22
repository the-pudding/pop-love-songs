<script>
	import Modal from '../helpers/Modal.svelte';
    
    export let buttonText = 'show modal';

	let showModal = false;
</script>

<button on:click={() => (showModal = true)}>{buttonText}</button>

<Modal bind:showModal>
	<h1>Data Methods</h1>
</Modal>
