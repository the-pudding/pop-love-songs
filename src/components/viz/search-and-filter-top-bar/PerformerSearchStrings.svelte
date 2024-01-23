<script>
	import { performerSearchStrings } from "$stores/searchAndFilter.js";
</script>

<div>
	{#each $performerSearchStrings as performerSearchString}
		<span class="search-string">{performerSearchString}</span>
	{/each}
</div>

<style>
	.search-string {
		background-color: #e0e0e0;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
		display: inline-block;
	}
</style>
