import { writable } from "svelte/store";

export const songSearchString = writable("");
export const selectedSongs = writable([]);
export const performerSearchString = writable("");
export const selectedPerformers = writable([]);

export const typesTreatedAsNonLoveSongs = writable([]);

export const showAggregateSnakeChart = writable(false);
