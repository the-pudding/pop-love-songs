import { derived } from "svelte/store";
import viewport from "./viewport.js";
import songsData from "$data/songs-data.js"
import { currentStoryStep } from "./storySteps.js";
import { getXPositionFromTime } from "$components/viz/viz-utils.js";


// Position (or the force layout that guides it)
export const xForcePosition = derived(
    [viewport, currentStoryStep],
    ([$viewport, $currentStoryStep]) => {
        const {width} = $viewport;
        const {comingSoon} = $currentStoryStep;
        // TEMP: hard coding this since its simple & doesn't depend on other derived state (eg deriving vertical position)
        return songsData.map(({song}) =>
            getXPositionFromTime(song, width)
        );
    }
);

// NA: yForcePositionAsAPercentOfScreen

// Size

// Color