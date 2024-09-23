<script>
    import { aSearchFilterExists } from "$stores/searchAndFilter";

    import OffsetAnnotations from "./OffsetAnnotations.svelte";
    import AdjacentAnnotations from "./AdjacentAnnotations.svelte";
    import AnnotatedBubbleOverlay from "./AnnotatedBubbleOverlay.svelte";
</script>

{#if !$aSearchFilterExists}
    <OffsetAnnotations />
    <AdjacentAnnotations />
    <AnnotatedBubbleOverlay />
{/if}