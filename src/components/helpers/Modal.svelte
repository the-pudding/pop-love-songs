<!-- Based on this example: https://svelte.dev/examples/modal -->
<script>
	export let showModal; // boolean
	export let showXButton = true;

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-autofocus -->
	{#if showXButton}
		<div class="button-container">
			<button autofocus on:click={() => dialog.close()} aria-label="Close Modal">X</button>
		</div>
	{/if}
	
	<!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="content" on:click|stopPropagation>
        <slot name="header" />
        {#if $$slots.header}
			<hr />
		{/if}
		
        <slot />
    </div>
</dialog>

<style>
	dialog {
		max-width: 42em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		margin: auto;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
	dialog > div.content {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		right: 0;
		position: sticky;
		height: 0;
		margin: 0;
		padding: 0;
	}
	dialog button {
		background: none;
		margin: 12px;
		height: 60px;
		width: 50px;
		font-size: 48px;
		font-weight: bold;
	}
</style>
