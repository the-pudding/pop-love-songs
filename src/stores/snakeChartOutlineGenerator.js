import { derived } from "svelte/store";
import viewport from "./viewport";

import { svgCoordsForLoveSongTypes } from "./aggregateSnakeChartPositions";

const BASE_OF_CHART = 0;

export const svgCoordsForSnakeChartOutline = derived(
	[svgCoordsForLoveSongTypes],
	([$svgCoordsForLoveSongTypes]) => {
		const timeRegionIndexes = $svgCoordsForLoveSongTypes[0].svgCoords.map(
			(_, index) => index
		);
		const y1MaxForAllLoveSongTypesAtEachX = timeRegionIndexes.map((index) => {
			const y1Max = $svgCoordsForLoveSongTypes.reduce(
				(accum, { svgCoords }) => {
					const { y1, x } = svgCoords[index];
					return y1 > accum.y1 ? { y0: BASE_OF_CHART, y1, x } : accum;
				},
				{ y0: BASE_OF_CHART, y1: -1, x: -1 }
			);
			return y1Max;
		});

		console.log(y1MaxForAllLoveSongTypesAtEachX);
		return y1MaxForAllLoveSongTypesAtEachX;
	}
);

export const snakeChartOutlinePathGenerator = derived(
	[viewport],
	([$viewport]) => createSVGPathGenerator($viewport)
);
