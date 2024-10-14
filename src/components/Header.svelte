<script>
	import viewport from "$stores/viewport";

	// shadow, plain, line, bubble
	import wordmark from "$svg/wordmark-shadow.svg";
</script>

<header>
	<div class="wordmark" style:max-width={$viewport.isLikelyInMobileLandscape ? '10em' : '14em'}>
		<a href="https://pudding.cool" aria-label="The Pudding - home" target="_self"
			>{@html wordmark}</a
		>
	</div>
</header>

<style>
	.wordmark {
		margin: 0 auto;
		padding: 32px 0;
		transform: rotate(-4deg);
		/* Apparently its getting position static, which is preventing z-index from working. Not sure why... */
		position: relative;
		z-index: 10000000;
	}

	.wordmark a {
		border: none !important;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
		opacity: 0.9;
	}
</style>
