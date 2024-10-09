import { writable } from "svelte/store";

const DEFAULT_STATE = {
	song: undefined,
	x: undefined,
	y: undefined,
	circleX: undefined,
	circleY: undefined,
	circleRadius: undefined
};
export default writable(DEFAULT_STATE);
