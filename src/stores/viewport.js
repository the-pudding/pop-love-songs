import { browser } from "$app/environment";
import { readable } from "svelte/store";
import debounce from "lodash.debounce";

// TODO: is this sensible?
export const MOBILE_LANDSCAPE_WIDTH = 850;
export const MOBILE_PORTRAIT_WIDTH = 420;

export default readable({ width: 0, height: 0 }, (set) => {
	const onResize = () =>
		set({
			width: window.innerWidth,
			height: window.innerHeight,
			isLikelyInMobileLandscape:
				window.innerWidth < MOBILE_LANDSCAPE_WIDTH ||
				window.innerHeight < MOBILE_PORTRAIT_WIDTH
		});

	if (browser) {
		onResize();
		window.addEventListener("resize", debounce(onResize, 100));
	}

	return () => {
		if (browser) window.removeEventListener("resize", onResize);
	};
});
