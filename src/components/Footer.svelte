<script>
	import wordmark from "$svg/wordmark-shadow.svg";
	import fetchedPuddingStories from "$stores/fetchedPuddingStories";

	const localURL = window.location.href;
	$: filteredStories = $fetchedPuddingStories.filter((d) => !localURL.includes(d.url)).slice(0, 4);

	const links = [
		{ name: "about", url: "https://pudding.cool/about" },
		{ name: "facebook", url: "https://facebook.com/pudding.viz/" },
		{ name: "twitter", url: "https://twitter.com/puddingviz/" },
		{
			name: "instagram",
			url: "https://www.instagram.com/the.pudding"
		},
		{ name: "patreon", url: "https://patreon.com/thepudding/" },
		{ name: "privacy", url: "https://pudding.cool/privacy/" },
		{ name: "newsletter", url: "https://pudding.cool/subscribe" },
		{ name: "rss", url: "https://pudding.cool/feed/index.xml" }
	];

</script>

<footer>
	<section class="stories">
		{#each filteredStories as { hed, url, image }}
			{@const href = url.startsWith("http")
				? url
				: `https://pudding.cool/${url}`}
			<div class="story">
				<a {href}>
					<img
						src="https://pudding.cool/common/assets/thumbnails/640/{image}.jpg"
						alt="thumbnail"
					/>
					<span>{hed}</span>
				</a>
			</div>
		{/each}
	</section>

	<section class="about">
		<div aria-hidden="true" class="wordmark">
			{@html wordmark}
		</div>
		<p>
			<a href="https://pudding.cool" target="_self">The Pudding</a>
			is a digital publication that explains ideas debated in culture with visual
			essays.
		</p>
	</section>

	<section class="links">
		<ul>
			{#each links as link}
				<li>
					<a href={link.url} target="_self">
						<span>{link.name.toUpperCase()}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</footer>

<style>
	footer {
		/* background-color: var(--color-its-complicated); */
		background-color: #72592e; /* meets a11y contrast requirement */
		color: white;
		font-family: var(--sans);
		padding: 3em 1em;
		margin-top: 36px;
	}

	a,
	a:visited,
	a:hover {
		color: var(--color-bg);
	}

	.stories {
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		max-width: 70em;
	}

	.story {
		display: block;
		width: 100%;
		border: none;
		margin-bottom: 3rem;
	}

	.story a {
		display: block;
		font-weight: 900;
		text-decoration: none;
		border: none;
	}

	.story span {
		display: block;
		margin-top: 1em;
		line-height: 1.2;
	}

	.wordmark {
		max-width: 10em;
		margin: 1em auto;
	}

	.about {
		margin: 3rem auto;
		margin-top: 0;
		text-align: center;
	}

	.links ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.links li {
		display: flex;
		padding: 0.5em 1em;
	}

	.links a {
		display: flex;
		border: none;
		align-items: center;
		text-decoration: none;
	}

	.links span {
		margin-left: 0.5em;
	}

	@media only screen and (min-width: 30em) {
		.story {
			width: 50%;
			padding: 0 1em;
		}
	}

	@media only screen and (min-width: 50em) {
		.story {
			width: 25%;
			padding: 0 1em;
		}
	}
</style>
