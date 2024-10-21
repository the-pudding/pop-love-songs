<script>
	import { currentStoryStep, isEndingSandboxStep } from "$stores/storySteps";
	import { figCaption } from "$stores/figCaption";
	
</script>

{#if !$currentStoryStep.hideViz}
	<figure>
		<slot />
		<figcaption class="sr-only" aria-live={$isEndingSandboxStep ? "assertive" : "off"}>
			{$figCaption}
		</figcaption>
	</figure>
{/if}