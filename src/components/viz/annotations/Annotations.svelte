<script>
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';

    import variables from '$data/variables.json';

    import { aSearchFilterExists } from "$stores/searchAndFilter";
    import { currentStoryStepIndex } from "$stores/storySteps";

    import OffsetAnnotations from "./OffsetAnnotations.svelte";
    import AdjacentAnnotations from "./AdjacentAnnotations.svelte";
    import AnnotatedBubbleOverlay from "./AnnotatedBubbleOverlay.svelte";
	
    const fadeSettings = {
        duration: variables.chart['transition-opacity-duration'], 
        delay: variables.chart['transition-opacity-duration']
    }

    // Re-trigger the "fade in" Svelte animation each time we change steps:
    let show = false;
    $: restartFadeInAnimation = async () => {
        show = false;
        await tick();
        show = true;
    }
    $: $currentStoryStepIndex, restartFadeInAnimation();
</script>

{#if !$aSearchFilterExists}
    {#if show}
        <div class="annotations" in:fade={fadeSettings}>
            <OffsetAnnotations />
            <AdjacentAnnotations />
            <AnnotatedBubbleOverlay />
        </div>
    {/if}
{/if}