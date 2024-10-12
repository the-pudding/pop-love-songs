<script>
	import copy from "$data/copy.json";
    import Modal from '../helpers/Modal.svelte';
	import { showOrientationWarningModal } from '$stores/orientationWarningModal';
    
    const { orientationWarningModal } = copy;
    let userDismissed = false;
    let dialog;
    $: handleClick = () => {
        // @michelle: for some reason, setting the userDismissed does *not* re-render close the modal as expected
        // only dialog.close() works. Why... ?
        userDismissed = true;
        dialog.close()
    }
    $: showModal = !userDismissed && $showOrientationWarningModal;
</script>

<Modal bind:showModal bind:dialog showXButton={false}>
    <div class='container'>
        {#each orientationWarningModal.paragraphs as paragraph}
            <p>{@html paragraph}</p>
        {/each}

        <button on:click={handleClick}>{@html orientationWarningModal.dismissButton}</button>
    </div>
</Modal>

<style>    
    .container {
        font-family: var(--serif);
        font-size: 16px;
        padding-left: 12px;
        padding-right: 12px;
    }
</style>
