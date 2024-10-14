<script>
	import { currentStoryStep } from "$stores/storySteps";
	import { figCaption } from "$stores/figCaption";
	
</script>

{#if !$currentStoryStep.hideViz}
	<figure>
		<slot />
		<figcaption class="sr-only" aria-live="polite">
			{$figCaption}
		</figcaption>
	</figure>
{/if}