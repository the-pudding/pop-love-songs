<script>
	import PerformerFilter from "./PerformerFilter.svelte";
	import SnakeBubbleToggle from "./SnakeBubbleToggle.svelte";
	import SongFilter from "./SongFilter.svelte";

</script>

<fieldset>
	<div>
		<SnakeBubbleToggle />
		<!-- These only make sense in bubble view: -->
		<PerformerFilter />
		<SongFilter />
	</div>
</fieldset>

<style>
	div {
		display: flex;
		justify-content: space-between;
		/* To save space: */
		font-size: 12px; 
	}
	fieldset {
		position: fixed;
		z-index: 999999999;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 1.25em;
		height: 50px;
		/* background: var(--color-fg); */

		/* override default fieldset stying */
		padding: 1px;
	}
</style>
