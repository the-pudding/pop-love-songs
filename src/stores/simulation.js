import { derived, writable } from "svelte/store";

export const simulationStore = writable();

export const nodePositionsInSimulation = derived(
	simulationStore,
	($simulationStore) => $simulationStore && $simulationStore.nodes()
);
