<script>
	import mq from "$stores/mq.js";
	import Icon from "./Icon.svelte";
	import pointer from "$svg/pointer.svg";
	import { currentStoryStepIndex } from "$stores/storySteps";
	import { textShadow } from "$utils/styling";
	
</script>

{#if $currentStoryStepIndex === 0}
	<div
		class="tap"
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
				<strong>Tap right & left<br/> half of screen to<br/> navigate story</strong>
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

<style>
	.tap {
		font-size: 1.3rem;
		position: fixed;		
		right: 0px;
		transform: translate(0%, -8px);
		margin-right: 12px;
    	height: 80px;

		display: flex;
		flex-direction: column;
		align-items: end;
		opacity: 0;
        animation: fadeIn 1s forwards;
        animation-delay: 2s;

		z-index: 1000;
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
</style>
