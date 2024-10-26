<script>
    import { tick } from 'svelte';

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
        show = true;
    }
    $: $currentStoryStepIndex, restartFadeInAnimation();
</script>

<div class="story-annotations {$showAnnotations && show ? 'fade-in' : 'fade-out'}">
    <!-- Using <ol /> because the annotations are always listed in sorted order from earliest to latest -->
    <ol aria-label="Example songs" class="annotations">
        <OffsetAnnotations />
        <AdjacentAnnotations />
    </ol>
    <div>
        <AnnotatedBubbleOverlay />
    </div>
 </div>

<SelectedPerformerAnnotations />
<SelectedSongAnnotation />

<style>
    .story-annotations {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .story-annotations.fade-in {
        opacity: 1;
    }

    .story-annotations.fade-out {
        opacity: 0;
    }
</style>