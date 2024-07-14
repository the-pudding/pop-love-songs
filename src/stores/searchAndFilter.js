import { writable } from "svelte/store";

export const selectedSongs = writable([]);
export const selectedPerformers = writable([]);

export const typesTreatedAsNonLoveSongs = writable([]);

export const showAggregateSnakeChart = writable(false);
