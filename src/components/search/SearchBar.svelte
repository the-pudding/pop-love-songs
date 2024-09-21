<script>
	import { aSearchBarIsFocused } from "$stores/searchAndFilter";

    export let placeholder = "Search...";
    export let searchString = "";

    $: console.log({$aSearchBarIsFocused})
</script>

<input 
    type="text" 
    placeholder={placeholder} 
    bind:value={searchString} 
    on:focus={() => aSearchBarIsFocused.set(true)} 
    on:blur={() => aSearchBarIsFocused.set(false)} 
/>

<style>
    input {
        background-color: var(--color-cream-background);
        border-radius: 12px;
        margin-right: 16px;
        font-family: var(--sans);
        font-style: italic;
    }
</style>