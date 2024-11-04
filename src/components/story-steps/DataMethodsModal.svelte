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
        <details>
            <summary>
                <h2>{title}</h2>
            </summary>
            {#each paragraphs as paragraph}
                {#if paragraph.endsWith('.png')}
                    <img src={`assets/images/${paragraph}`} alt={'A two by two gride laying out all seven love song types using relationship and how traditional they are'} />
                {:else}
                    <p>{@html paragraph}</p>
                {/if}
            {/each}
        </details>
    {/each}
</Modal>

<style>
    * {
        text-shadow: none;
    }
    
    h1 {
        font-size: 35px;
    }

    h2 {
        display: inline;
        font-size: 24px;
        margin-top: 24px;
        margin-bottom: 0px;
    }

    p {
        font-size: 16px;
    }

    h2 + p {
        margin-top: 4px;
    }
</style>
