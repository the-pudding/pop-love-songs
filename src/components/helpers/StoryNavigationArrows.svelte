<!-- Component largely stolen from Michelle's anthem piece -->
<script>
	import { ChevronLeft, ChevronRight } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";

	import mq from "$stores/mq";
	import viewport from "$stores/viewport";
	import { currentStoryStepIndex, isLastStep, TOTAL_STORY_STEPS } from "$stores/storySteps";
	import variables from '$data/variables'
	
	import Tap from "./Tap.svelte";

	export let userHasSeenFirstSlide;

	export let enableKeyboard = false;
	const arrowStroke = variables.color['cream-background'];
	export let arrowStrokeWidth = "2";

	const dispatch = createEventDispatcher();
	const DIRECTIONS = ["left", "right"];
	$: onKeyDown = (e) => {
		const dir = e.key.replace("Arrow", "").toLowerCase();
		const hasDir = DIRECTIONS.includes(dir);
		if (enableKeyboard && hasDir) {
			e.preventDefault();
			dispatch("tap", dir);
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<!-- @michelle: my "use semantic HTML" game feels week. Do you have an intuition why section was used here? When do you use this tag? -->
<section class="tapper-overlay" style={`height: ${$viewport.height}px; width: ${$viewport.width}px;`}>
	{#if !userHasSeenFirstSlide}
		<Tap />
	{/if}
	{#if $currentStoryStepIndex !== 0}
		{#if $mq.desktop}
			<button
				aria-label={`Return to step ${$currentStoryStepIndex} of ${TOTAL_STORY_STEPS}`}
				class="left-hint"
				on:click={() => dispatch("tap", "left")}
			>
				<ChevronLeft
					color={arrowStroke}
					strokeWidth={arrowStrokeWidth}
					size="2rem"
					aria-hidden="true"
					focusable="false"
				/>
			</button>
		{:else}
			<button
				aria-label={`Return to step ${$currentStoryStepIndex} of ${TOTAL_STORY_STEPS}`}
				class="left-tap-region"
				on:click={() => dispatch("tap", "left")}
			></button>
		{/if}
	{/if}
	{#if !$isLastStep}
		{#if $mq.desktop}
			<button
				aria-label={`Advance to step ${$currentStoryStepIndex + 2} of ${TOTAL_STORY_STEPS}`}
				class="right-hint"
				class:bounceHint={$currentStoryStepIndex == 0}
				on:click={() => dispatch("tap", "right")}
			>
				<ChevronRight
					color={arrowStroke}
					strokeWidth={arrowStrokeWidth}
					size="2rem"
					aria-hidden="true"
					focusable="false"
				/>
			</button>
		{:else}
			<button
				aria-label={`Advance to step ${$currentStoryStepIndex + 2} of ${TOTAL_STORY_STEPS}`}
				class="right-tap-region"
				on:click={() => dispatch("tap", "right")}
			></button>
		{/if}
	{/if}
</section>

<style>
	.tapper-overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		pointer-events: none;
	}
	.tapper-overlay {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		z-index: 999;
	}
	.left-hint,
	.right-hint {
		background: var(--color-fg);
		opacity: 0.3;
		height: 6rem;
		width: 6rem;
		display: flex;
		align-items: center;
		z-index: 999;
		pointer-events: auto;
		position: absolute;
		transition: all calc(var(--1s) * 0.25) ease-in-out;
	}
	.left-hint {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		justify-content: flex-end;
		padding: 0 0.5rem 0 0;
		border-radius: 0 3rem 3rem 0;
		left: 0;
	}
	.left-hint:hover, .left-hint:focus {
		transform: translate(-45%, -50%);
		opacity: 1;
		background: var(--color-good-riddance);
	}
	.right-hint {
		position: absolute;
		top: 50%;
		transform: translate(50%, -50%);
		justify-content: flex-start;
		padding: 0 0 0 0.5rem;
		border-radius: 3rem 0 0 3rem;
		right: 0;
	}
	.right-hint:hover, .right-hint:focus {
		transform: translate(45%, -50%);
		opacity: 1;
		background: var(--color-good-riddance);
	}
	.bounceHint {
		background: var(--color-good-riddance);
		opacity: 1;
		animation: bounce 1.5s infinite linear;
	}
	@keyframes bounce {
		0% {
			transform: translate(50%, -50%);
		}
		50% {
			transform: translate(40%, -50%);
		}
		100% {
			transform: translate(50%, -50%);
		}
	}
	button {
		position: absolute;
		cursor: pointer;
		background: none;
		border-radius: 0;
		border: none;
		box-shadow: none;
		pointer-events: auto;
	}
	button:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	/* TODO: since we're having people look in landscape, this breakpoint should be bigger (but do we want them to shrink at all?) */
	@media (max-width: 600px) {
		.left-hint,
		.right-hint {
			height: 4rem;
			width: 4rem;
		}
		.left-hint {
			padding: 0 0.25rem 0 0;
		}
		.right-hint {
			padding: 0 0 0 0.25rem;
		}
	}

	.left-tap-region,
	.right-tap-region {
		position: absolute;
		top: 0;
		height: 100%;
		width: 20%;
		background: transparent;
		
		pointer-events: auto;

		border: 2px solid black; /* tEMPORARY */
	}

	.left-tap-region {
		left: 0;
	}

	.right-tap-region {
		right: 0;
	}
</style>
