import { browser } from "$app/environment";
import { readable } from "svelte/store";
import debounce from "lodash.debounce";

// TODO: is this sensible?
export const MOBILE_LANDSCAPE_WIDTH = 768;

export default readable({ width: 0, height: 0 }, (set) => {
	const onResize = () =>
		set({
			width: window.innerWidth,
			height: window.innerHeight,
			isMobileLandscapeWidth: window.innerWidth < MOBILE_LANDSCAPE_WIDTH,
			blah: console.log(window.innerWidth < MOBILE_LANDSCAPE_WIDTH)
		});

	if (browser) {
		onResize();
		window.addEventListener("resize", debounce(onResize, 250));
	}

	return () => {
		if (browser) window.removeEventListener("resize", onResize);
	};
});
