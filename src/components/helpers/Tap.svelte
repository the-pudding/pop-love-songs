<script>
	import mq from "$stores/mq.js";
	import Icon from "./Icon.svelte";
	import pointer from "$svg/pointer.svg";
	import { currentStoryStepIndex } from "$stores/storySteps";
	
</script>

{#if $currentStoryStepIndex === 0}
	<div class="tap">
		<div class="row">
			<strong>{$mq.desktop ? "Click" : "Tap"} to continue</strong>
			{@html pointer}
		</div>

		{#if $mq.desktop}
			<div class="row keyboard">
				<strong>Or use the keyboard</strong>
				<div class="key"><Icon name="chevron-left" /></div>
				<div class="key"><Icon name="chevron-right" /></div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.tap {
		font-size: 1.3rem;
		position: fixed;		
		top: 50%;
		right: 0px;
		transform: translate(0%, 30px);
		margin-right: 12px;
    	height: 80px;

		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0;
        animation: fadeIn 1s forwards;
        animation-delay: 4s;
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
