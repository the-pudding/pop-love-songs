<script>
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';

    import variables from '$data/variables.json';

    import { aSearchFilterExists } from "$stores/searchAndFilter";
    import { currentStoryStepIndex } from "$stores/storySteps";

    import OffsetAnnotations from "./OffsetAnnotations.svelte";
    import AdjacentAnnotations from "./AdjacentAnnotations.svelte";
    import AnnotatedBubbleOverlay from "./AnnotatedBubbleOverlay.svelte";

    const inFadeSettings = {
        duration: variables.chart['transition-opacity-duration'], 
        delay: variables.chart['transition-opacity-duration']
    }	
    const outFadeSettings = {
        duration: variables.chart['transition-opacity-duration'] / 2, 
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

{#if !$aSearchFilterExists && show}
    <div class="annotations" in:fade={inFadeSettings} out:fade={outFadeSettings}>
        <OffsetAnnotations />
        <AdjacentAnnotations />
        <AnnotatedBubbleOverlay />
    </div>
{/if}