import { derived } from "svelte/store";
import mq from "./mq";
import viewport from "./viewport";

const FUDGE_FACTOR = 0.8;
export const showOrientationWarningModal = derived(
	[mq, viewport],
	// TODO: abstract logic into viewport
	([$mq, $viewport]) =>
		!$mq.desktop && FUDGE_FACTOR * $viewport.height > $viewport.width
);
