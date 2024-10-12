<script>
	import copy from "$data/copy.json";
    import Modal from '../helpers/Modal.svelte';
	import { showOrientationWarningModal } from '$stores/orientationWarningModal';
	import { tick } from "svelte";
    
    const { orientationWarningModal } = copy;
    let userDismissed = false;

    $: handleClick = () => {
        console.log('clicked');
        userDismissed = true;
        console.log({userDismissed})
    }
    $: showModal = !userDismissed && $showOrientationWarningModal;
</script>

<Modal bind:showModal showXButton={false}>
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
