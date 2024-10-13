<script>
	export let figcaption;
</script>

<figure>
	<slot />
	<figcaption class="sr-only" aria-live="polite">
		{figcaption}
	</figcaption>
</figure>