<script>
	import mq from "$stores/mq.js";
	import Icon from "./Icon.svelte";
	import pointer from "$svg/pointer.svg";
	import { currentStoryStepIndex } from "$stores/storySteps";
	import { textShadow } from "$utils/styling";
	
</script>

{#if $currentStoryStepIndex === 0}
	<div
		class="tap fade-in"
		aria-hidden="true"
		style:text-shadow={textShadow(2, 1)} 
		style:font-size={$mq.desktop ? '1.3rem' : '1rem'}
		style:top={$mq.desktop ? '50%' : '20%'}
	>
		<div class="row">
			{@html pointer}
		</div>
		{#if $mq.desktop}
			<div class="row">
				<strong>Click to continue</strong>
			</div>
		{:else}
			<div class="">
				<strong>Tap right <br/> side of screen to<br/> advance story</strong>
			</div>
		{/if}

		{#if $mq.desktop}
			<div class="row keyboard">
				<strong>Or use the keyboard</strong>
				<div class="key"><Icon name="chevron-left" /></div>
				<div class="key"><Icon name="chevron-right" /></div>
			</div>
		{/if}
	</div>
	<div class="sr-only">
		{$mq.desktop ? 'Click navigation arrows or use the left and right keyboard arrows to navigate through the article.' : 'Tap the left and right half of the screen to navigate through the article.'}
    </div>
{/if}

{#if $currentStoryStepIndex === 1 && !$mq.desktop}
	<div class="fade-in" aria-hidden="true" style:text-shadow={textShadow(2, 1)} style:font-size="1rem">
		<div class="second-step-right-hint">
			<span>{@html pointer}</span>
			<strong>Advance</strong>
		</div>
		<div class="second-step-left-hint">
			<span class="pointer">{@html pointer}</span>
			<strong>Return</strong>
		</div>
	</div>
	<!-- No sr-only here since the instructions are given fully on the previous step -->
{/if}

<style>
	.tap {
		position: fixed;		
		right: 0px;
		transform: translate(0%, -8px);
		margin-right: 12px;
		height: 80px;

		display: flex;
		flex-direction: column;
		align-items: end;

		z-index: 1000;
	}

	.fade-in {
		opacity: 0;
		animation: fadeIn 1s forwards;
		animation-delay: 2s;
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	.row {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;
	}
	.keyboard {
		font-size: 1rem;
	}
	.key {
		display: flex;
		padding: 4px;
		margin-left: 4px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		background-color: #f9f9f9;
		text-align: center;
	}
	.key:first-of-type {
		margin-left: 10px;
	}

	.second-step-right-hint {
		position: fixed;
		top: 30%;
		right: 10%;
		display: flex;
		flex-direction: column;

		transform: translateX(50%);
	}

	.second-step-left-hint {
		position: fixed;
		top: 30%;
		left: 5%;
		display: flex;
		flex-direction: column;
	}

	.second-step-left-hint > .pointer {
		transform: scaleX(-1);
	}
</style>
