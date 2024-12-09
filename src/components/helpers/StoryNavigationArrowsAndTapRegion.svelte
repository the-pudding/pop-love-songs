<script>
	import { ChevronLeft, ChevronRight } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";

	import mq from "$stores/mq";
	import viewport from "$stores/viewport";
	import { currentStoryStepIndex, isEndingSandboxStep, isLastStep, TOTAL_STORY_STEPS } from "$stores/storySteps";
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
	$: rightAriaLabel = `Advance to step ${$currentStoryStepIndex + 2} of ${TOTAL_STORY_STEPS}`;
	$: leftAriaLabel = `Return to step ${$currentStoryStepIndex} of ${TOTAL_STORY_STEPS}`;

	// Reduce risk of missing love song target and changing step
	$: tapRegionPercentageOfScreen = $isEndingSandboxStep || $isLastStep  ? 18 : 35; 
	$: leftTapRegionStyle = `left: 0; width: calc(2 * ${tapRegionPercentageOfScreen}%); transform: translateX(-50%);`;
	$: rightTapRegionStyle = `right: 0; width: calc(2 * ${tapRegionPercentageOfScreen}%); transform: translateX(50%);`;
</script>

<svelte:window on:keydown={onKeyDown} />

<section class="tapper-overlay" style={`height: ${$viewport.height}px; width: ${$viewport.width}px;`}>
	<Tap />

	{#if $currentStoryStepIndex !== 0}
		{#if $mq.desktop}
			<button
				aria-label={leftAriaLabel}
				class="left-hint arrow"
				on:click={() => dispatch("tap", "left")}
			>
				<ChevronLeft
					color={arrowStroke}
					strokeWidth={arrowStrokeWidth}
					size="2rem"
					aria-hidden="true"
				/>
			</button>
		{:else}
			<button
				aria-label={leftAriaLabel}
				class="left-tap-region"
				style={leftTapRegionStyle}
				on:click={() => dispatch("tap", "left")}
			></button>
		{/if}
	{/if}
	{#if !$isLastStep}
		{#if $mq.desktop}
			<button
				aria-label={rightAriaLabel}
				class="right-hint arrow"
				class:bounceHint={$currentStoryStepIndex == 0}
				on:click={() => dispatch("tap", "right")}
			>
				<ChevronRight
					color={arrowStroke}
					strokeWidth={arrowStrokeWidth}
					size="2rem"
					aria-hidden="true"
				/>
			</button>
		{:else}
			<button
				aria-label={rightAriaLabel}
				class="right-tap-region"
				style={rightTapRegionStyle}
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

		pointer-events: none;

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

	.left-tap-region,
	.right-tap-region {
		position: absolute;
		top: 0;
		height: 100%;
		background: transparent;
		/* border: 4px solid black; */

		/* We extend the tap regions off screen because on (at least) iPhone, there is a big margins on either side in landscape */
		pointer-events: auto;
	}

	.left-tap-region:focus,
	.right-tap-region:focus {
		background: rgba(211, 211, 211, 0.3);
	}
</style>
