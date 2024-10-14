<!-- Component largely stolen from Michelle's anthem piece -->
<script>
	import { ChevronLeft, ChevronRight } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";

	import viewport from "$stores/viewport";
	import { currentStoryStepIndex, isLastStep } from "$stores/storySteps";
	import variables from '$data/variables'
	
	import Tap from "./Tap.svelte";

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
	{#if $currentStoryStepIndex !== 0}
		<button
			aria-label="Previous step"
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
	{/if}
	{#if !$isLastStep}
		<button
			aria-label="Next step"
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
	{/if}
	<Tap />
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
        /* TODO: this feels too high on the screen on mobile */
		top: 55%;
		transition: all calc(var(--1s) * 0.25) ease-in-out;
	}
	.left-hint {
		transform: translate(-50%, -100%);
		justify-content: flex-end;
		padding: 0 0.5rem 0 0;
		border-radius: 0 3rem 3rem 0;
		left: 0;
	}
	.left-hint:hover, .left-hint:focus {
		transform: translate(-45%, -100%);
		opacity: 1;
		background: var(--color-good-riddance);
	}
	.right-hint {
		transform: translate(50%, -100%);
		justify-content: flex-start;
		padding: 0 0 0 0.5rem;
		border-radius: 3rem 0 0 3rem;
		right: 0;
	}
	.right-hint:hover, .right-hint:focus {
		transform: translate(45%, -100%);
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
			transform: translate(50%, -100%);
		}
		50% {
			transform: translate(40%, -100%);
		}
		100% {
			transform: translate(50%, -100%);
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
</style>
