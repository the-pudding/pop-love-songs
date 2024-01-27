<script>
	import LoveSongTypeFilter from "./LoveSongTypeFilter.svelte";
	import GenderFilter from "./GenderFilter.svelte";
	import GenreFilter from "./GenreFilter.svelte";
	import PerformerFilter from "./PerformerFilter.svelte";
	import SongFilter from "./SongFilter.svelte";
	import PerformerSearchStrings from "./PerformerSearchStrings.svelte";
	import TimeRangeFilter from "./TimeRangeFilter.svelte";
</script>

<fieldset>
	<div>
		<LoveSongTypeFilter />
		<GenderFilter />
		<GenreFilter />
		<PerformerFilter />
		<PerformerSearchStrings />
		<SongFilter />
		<TimeRangeFilter />
	</div>
</fieldset>

<style>
	div {
		display: flex;
		justify-content: space-between;
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
