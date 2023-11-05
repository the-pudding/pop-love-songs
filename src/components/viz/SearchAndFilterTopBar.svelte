<script>
	import Select from "../helpers/Select.svelte";
</script>

<div>
	<Select options={[{ label: "bye", value: "bye" }]} />
</div>

<style>
	div {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 1.25em;
		height: 50px;
		/* background: var(--color-fg);
		color: var(--color-bg);
		font-family: monospace;
		font-size: 16px; */
	}
</style>
