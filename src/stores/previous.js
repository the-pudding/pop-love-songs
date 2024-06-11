import { derived } from "svelte/store";

export default (store, defaultValue = null) => {
	let p = defaultValue;

	return derived(store, (current) => {
		const previous = p;
		p = current;
		return previous;
	});
};
