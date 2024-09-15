<!-- Component largely stolen from Michelle's anthem piece -->
<script>
	import { ChevronLeft, ChevronRight } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";

	import { currentStoryStepIndex, isLastStep } from "$stores/storySteps";
	import variables from '$data/variables'

	export let enableKeyboard = false;
	// export let disable = [];
	export let directions = ["left", "right"];
	// export let arrowSize = "36px";
	const arrowStroke = variables.color['cream-background'];
	export let arrowStrokeWidth = "2";
	// export let arrowPosition = "center"; // start, center, end

	const dispatch = createEventDispatcher(); 
	$: onKeyDown = (e) => {
		const dir = e.key.replace("Arrow", "").toLowerCase();
		const hasDir = directions.includes(dir);
		if (enableKeyboard && hasDir) {
			e.preventDefault();
			dispatch("tap", dir);
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<section class="tapper-overlay">
	{#each directions as dir}
		{#if dir == "left"}
			{#if $currentStoryStepIndex !== 0}
				<button class="{dir}-hint" on:click={dispatch("tap", dir)}>
					<ChevronLeft
						color={arrowStroke}
						strokeWidth={arrowStrokeWidth}
						size={"2rem"}
					/>
				</button>
			{/if}
		{:else if !$isLastStep}
			<button
				class="{dir}-hint"
				class:bounceHint={$currentStoryStepIndex == 0}
				on:click={dispatch("tap", dir)}
			>
                <ChevronRight
                    color={arrowStroke}
                    strokeWidth={arrowStrokeWidth}
                    size={"2rem"}
                />
			</button>
		{/if}
	{/each}
</section>

<style>
	.tapper,
	.tapper-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
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
	.left-hint:hover {
		transform: translate(-40%, -100%);
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
	.right-hint:hover {
		transform: translate(40%, -100%);
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
		outline: none;
		border: none;
		box-shadow: none;
		pointer-events: auto;
	}
	button.haltTap {
		pointer-events: none;
	}
	button:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.left {
		left: 0;
		top: 0;
		/* text-align: left; */
	}

	.right {
		right: 0;
		top: 0;
		/* text-align: right; */
	}

	.left.start,
	.right.start {
		align-items: flex-start;
	}

	.left.center,
	.right.center {
		top: 50%;
		transform: translateY(-50%);
	}

	.left.end,
	.right.end {
		bottom: 0;
		top: auto;
	}

	.up {
		top: 0;
		left: 0;
		/* text-align: center; */
	}

	.down {
		bottom: 0;
		left: 0;
		/* text-align: center; */
	}

	.up.center,
	.down.center {
		left: 50%;
		transform: translateX(-50%);
	}

	.up.end,
	.down.end {
		right: 0;
		left: auto;
	}

	/* full positions */
	.full.left.start,
	.full.right.start {
		align-items: flex-start;
	}

	.full.left.center,
	.full.right.center {
		align-items: center;
	}

	.full.left.end,
	.full.right.end {
		align-items: flex-end;
	}

	.full.up.start,
	.full.down.start {
		justify-content: flex-start;
	}

	.full.up.center,
	.full.down.center {
		justify-content: center;
	}

	.full.up.end,
	.full.down-end {
		justify-content: flex-end;
	}

    /* TODO: since we're having people look in landscape, this breakpoint should be bigger (but do we want them to shrink at all?) */
	@media (max-width: 600px) {
		.directions {
			padding: 0 0 0 1rem;
			font-size: var(--18px);
			width: 70%;
		}
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
