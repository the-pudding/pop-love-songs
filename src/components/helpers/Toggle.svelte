<!-- NOTE: David modified this file so the parent would control state, this just displays it and calls a callback when toggled -->
<script>
	export let ariaLabel;
	export let ariaAnnouncementOnChange;
	export let options = ["on", "off"];
	export let value = options[0];
	export let onToggle = () => {};

	$: checked = value === options[0];

	const handleClick = (event) => {
		const target = event.target;
		const state = target.getAttribute("aria-checked");
		checked = state === "true" ? false : true;
		onToggle({checked, value: checked ? options[0] : options[1]});
	};
</script>

<div class="toggle toggle--inner">
	<button
		role="switch"
		aria-checked={checked}
		aria-label={ariaLabel}
		on:click={handleClick}
	>
		<span>{options[0]}</span>
		<div class="sr-only" aria-live="assertive" aria-label={ariaAnnouncementOnChange}/>
		<span>{options[1]}</span>
	</button>
</div>

<style>
	div.toggle {
		/* Leaves room for it to oveflow over on medium-small screens */
		min-height: var(--search-bar-height);
	}
	.toggle button {
		font-family: var(--sans);
		font-size: 1em;
		height: 100%;
	}

	.toggle--inner [role="switch"][aria-checked="true"] :first-child,
	[role="switch"][aria-checked="false"] :last-child {
		display: inline-block;
		border-radius: 4px;
		background: var(--color-gray-900);
		color: var(--color-gray-100);
	}

	.toggle--inner button {
		padding: 0.5em;
        background-color: var(--color-cream-background);
        border-radius: 12px;
        font-style: italic;
		outline: 1px solid var(--color-border, ray);
	}

	.toggle--inner button span {
		user-select: none;
		pointer-events: none;
		display: inline-block;
		line-height: 1;
		padding: 0.25em;
	}

	.toggle--inner button:focus {
		/* box-shadow: 0 0 4px 0 var(--color-focus); */
		/* See app.css, copied from there */
		outline: 2px solid var(--color-focus);
		outline-offset: 2px;
	}
</style>
