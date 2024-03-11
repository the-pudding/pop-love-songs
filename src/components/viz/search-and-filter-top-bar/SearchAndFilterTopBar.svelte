<script>
	import LoveSongTypeFilter from "./LoveSongTypeFilter.svelte";
	import GenderFilter from "./GenderFilter.svelte";
	import PerformerFilter from "./PerformerFilter.svelte";
	import SongFilter from "./SongFilter.svelte";
	import TimeRangeFilter from "./TimeRangeFilter.svelte";
	// Purely for authorship visibility/ease:
	import ColumnsToFilterVisibilityOn from './ColumnsToFilterVisibilityOn.svelte'
	import VisibleButNotSelectedLoveSongTypes from './VisibleButNotSelectedLoveSongTypes.svelte'


</script>

<fieldset>
	<div>
		<LoveSongTypeFilter />
		<GenderFilter />
		<PerformerFilter />
		<SongFilter />
		<TimeRangeFilter />
		<!-- For authoring -->
		<span>Slide-controls:</span>
		<ColumnsToFilterVisibilityOn />
		<VisibleButNotSelectedLoveSongTypes />
		<span>)</span>
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
