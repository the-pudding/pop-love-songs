<script>
	import copy from "$data/copy.json";
    import Modal from '../helpers/Modal.svelte';
	import { showOrientationWarningModal } from '$stores/orientationWarningModal';
    
    const { orientationWarningModal } = copy;
    let userDismissed = false;
    let dialog;
    $: handleClick = () => {
        userDismissed = true;
        dialog.close()
    }

    let showModal;
    $: { 
        if ($showOrientationWarningModal && !userDismissed) {
            showModal = true; // necessary
        }
        if (showModal && !$showOrientationWarningModal && !userDismissed) {
            dialog.close();
            showModal = false; // unnecessary, weirdly
        }
    }

    $: onBackgroundClick = async () => {
        userDismissed = true;
    }

</script>

<Modal bind:showModal bind:dialog maxWidth={'95%'} showXButton={false} {onBackgroundClick}>
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
