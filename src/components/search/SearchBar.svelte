<script>
    
    export let placeholder = "Search...";
    export let searchString = "";
</script>

<input type="text" placeholder={placeholder} bind:value={searchString} />

<style>
    input {
        background-color: var(--color-cream-background);
        border-radius: 12px;
        margin-right: 16px;
        font-family: var(--sans);
        font-style: italic;
    }
</style>