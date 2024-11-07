import { browser } from "$app/environment";
import { readable } from "svelte/store";
import debounce from "lodash.debounce";

const small = {
	width: 850,
	height: 600
};

export default readable({ width: 0, height: 0, ready: false }, (set) => {
	const onResize = () =>
		set({
			ready: true,
			width: window.innerWidth,
			height: window.innerHeight,
			isSmallish:
				window.innerWidth < small.width || window.innerHeight < small.height
		});

	if (browser) {
		onResize();
		window.addEventListener("resize", debounce(onResize, 100));
	}

	return () => {
		if (browser) window.removeEventListener("resize", onResize);
	};
});
