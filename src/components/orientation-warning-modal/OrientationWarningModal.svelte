<script>
	import copy from "$data/copy.json";
    import Modal from '../helpers/Modal.svelte';
	import { showOrientationWarningModal } from '$stores/orientationWarningModal';
    
    
    const { orientationWarningModal } = copy;
    let userDismissed = false;
</script>

<Modal showModal={!userDismissed && $showOrientationWarningModal}>
    {#each orientationWarningModal.paragraphs as paragraph}
        <p>{@html paragraph}</p>
    {/each}

    <button on:click={() => userDismissed = false}>{@html orientationWarningModal.dismissButton}</button>
</Modal>

<style>    
    p {
        font-family: var(--serif);
        font-size: 16px;
    }
</style>
