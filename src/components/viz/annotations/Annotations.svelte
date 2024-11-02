<script>
    import { tick } from 'svelte';

    import variables from '$data/variables';

    import { showAnnotations } from "$stores/searchAndFilter";
    import { currentStoryStepIndex } from "$stores/storySteps";

    import OffsetAnnotations from "./OffsetAnnotations.svelte";
    import AdjacentAnnotations from "./AdjacentAnnotations.svelte";
    import AnnotatedBubbleOverlay from "./AnnotatedBubbleOverlay.svelte";
    import SelectedPerformerAnnotations from './SelectedPerformerAnnotations.svelte';
    import SelectedSongAnnotation from './SelectedSongAnnotation.svelte';

    // Re-trigger the "fade in" CSS animation each time we change steps:
    let show = false;
    $: restartFadeInAnimation = async () => {
        show = false;
        await tick();
        setTimeout(() => {
            show = true;
        }, variables.chart["transition-opacity-duration"]);
    }
    $: $currentStoryStepIndex, restartFadeInAnimation();
</script>

{#if $showAnnotations && show}
    <div class="story-annotations fade-in">
        <!-- Using <ol /> because the annotations are always listed in sorted order from earliest to latest -->
        <ol aria-label="Example songs" class="annotations">
            <OffsetAnnotations />
            <AdjacentAnnotations />
        </ol>
        <div>
            <AnnotatedBubbleOverlay />
        </div>
    </div>
 {/if}

<SelectedPerformerAnnotations />
<SelectedSongAnnotation />

<style>
    .fade-in {
        animation: fadeIn 1s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>