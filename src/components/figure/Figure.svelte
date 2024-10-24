<script>
	import { currentStoryStep, isEndingSandboxStep } from "$stores/storySteps";
	import { figCaption } from "$stores/figCaption";
	
</script>

{#if !$currentStoryStep.hideViz}
	<figure>
		<figcaption class="sr-only" aria-live={$isEndingSandboxStep ? "assertive" : "off"}>
			{$figCaption}
		</figcaption>
		<slot />
	</figure>
{/if}