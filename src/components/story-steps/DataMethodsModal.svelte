<script>
	import Modal from '../helpers/Modal.svelte';
    import copy from "$data/copy.json";

	import DownloadDataLink from './DownloadDataLink.svelte';
	
    const { dataMethods } = copy;

    export let showModal = false; // boolean
</script>

<Modal bind:showModal>
	<h1 slot="header">Data Methods</h1>
    
    {#each dataMethods as {title, paragraphs}}
        <details>
            <summary>
                <h2>{title}</h2>
            </summary>
            {#each paragraphs as paragraph}
                {#if paragraph.endsWith('.png')}
                    <img src={`assets/images/${paragraph}`} alt={'A two by two gride laying out all seven love song types using relationship and how traditional they are'} />
                {:else if paragraph.startsWith(copy.dataDownloadButtonFlag)}
                    <DownloadDataLink>
                        {@html paragraph.replace(copy.dataDownloadButtonFlag, '').trim()}
                    </DownloadDataLink>
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

    details {
        margin-top: 12px;
    }

    summary {
        cursor: pointer;
    }

    h2 {
        display: inline;
        font-size: 24px;
    }

    p {
        font-size: 16px;
    }

    h2 + p {
        margin-top: 4px;
    }
</style>
