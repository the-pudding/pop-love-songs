import { writable } from "svelte/store";

export const playing = writable(undefined);
export const audioCanPlay = writable(false); // TODO: unclear if we need this to be global