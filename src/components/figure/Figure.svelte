<script>
	import { currentStoryStep } from "$stores/storySteps";
	export let figcaption;
</script>

{#if !$currentStoryStep.hideViz}
	<figure>
		<slot />
		<figcaption class="sr-only" aria-live="polite">
			{figcaption}
		</figcaption>
	</figure>
{/if}