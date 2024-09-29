<script>
    export let fullText = '';
    export let query = '';

    // Function to highlight the first occurrence of the query
    function highlightText(text, query) {
        if (!query) return text;
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return text;

        const beforeMatch = text.slice(0, index);
        const match = text.slice(index, index + query.length);
        const afterMatch = text.slice(index + query.length);

        return { beforeMatch, match, afterMatch };
    }
</script>

{#if query}
    {@const { beforeMatch, match, afterMatch } = highlightText(fullText, query)}
    {beforeMatch}<b>{match}</b>{afterMatch}
{:else}
    {fullText}
{/if}