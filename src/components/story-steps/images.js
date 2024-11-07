import copy from "$data/copy.json";
import loadImage from "$utils/loadImage";

export const BOOMER_BOB_COMMENT_IMAGE = {
	src: "assets/images/Boomer Bob comment.png",
	alt: `A screenshot of a comment from a user named Boomer Bob reading: ${copy.commentText.boomerBobComment}`
};

export const TITLE_CARD_BACKGROUND_IMAGE = {
	src: "assets/images/elvis and olivia rodrigo.png",
	alt: "Elvis Presley, smiling, and Olivia Rodrigo, scowling, side by side."
};

export const HEADLINES = {
	generationWithoutLove: {
		src: "assets/images/headlines/a generation without love songs.png",
		alt: "A Huffpost headline that reads 'A generation without love songs.'",
		url: "https://www.huffpost.com/entry/where-is-the-love-a-generation-without-love-songs_b_5894061de4b0985224db53fa"
	},
	harderToFind: {
		src: "assets/images/headlines/love songs are harder to find.png",
		alt: "An Andscape headline that reads 'Where did the love go? In today's black pop music, love songs are harder to find'",
		url: "https://andscape.com/features/where-did-the-love-go-in-todays-black-pop-music-love-songs-are-harder-to-find/"
	},
	inDecline: {
		src: "assets/images/headlines/love songs are in decline.png",
		alt: "A headline from The Guardian that reads 'Love Songs are In Decline -- but at least Pharell's happy'",
		url: "https://www.theguardian.com/commentisfree/2014/mar/21/song-lyrics-analysis-love"
	},
	rip: {
		src: "assets/images/headlines/Love Songs, RIP.png",
		alt: "A Commentary.org headline that reads 'Love Songs, RIP'",
		url: "https://www.commentary.org/articles/terry-teachout/love-songs-rip/"
	},
	dontWriteThemLikeTheyUsedTo: {
		src: "assets/images/headlines/they don't write love songs like they used to.png",
		alt: "A title from a Quora post that reads 'How come they no longer write love songs like they used to?'",
		url: "https://www.quora.com/How-come-they-no-longer-write-love-songs-like-they-used-to"
	}
};

export const loadFirstImage = async () => {
	await loadImage(BOOMER_BOB_COMMENT_IMAGE.src);
};

export const loadRemainingImages = async () => {
	const images = [
		...Object.values(HEADLINES).map(({ src }) => src),
		TITLE_CARD_BACKGROUND_IMAGE.src
	];
	await Promise.all(images.map(loadImage));
};
