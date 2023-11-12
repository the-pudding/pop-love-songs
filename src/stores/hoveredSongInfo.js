import { writable } from "svelte/store";

const DEFAULT_STATE = {
    song: undefined,
    x: undefined,
    y: undefined,
};
export default writable(DEFAULT_STATE);
