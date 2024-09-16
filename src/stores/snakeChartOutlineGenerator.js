import { derived } from "svelte/store";
import viewport from "./viewport";

import { svgCoordsForLoveSongTypes } from "./aggregateSnakeChartPositions";
import { LOVE_SONG_TYPE_CONSTANTS } from "$data/data-constants";

const BASE_OF_CHART = 1;

export const svgCoordsForSnakeChartOutline = derived(
	[svgCoordsForLoveSongTypes],
	([$svgCoordsForLoveSongTypes]) => {
		const withoutNonLoveSongs = $svgCoordsForLoveSongTypes.filter(
			({ loveSongType }) =>
				loveSongType !== LOVE_SONG_TYPE_CONSTANTS.notALoveSong
		);
		const timeRegionIndexes = withoutNonLoveSongs[0].svgCoords.map(
			(_, index) => index
		);
		return timeRegionIndexes.map((index) => {
			const coordinateObjectWithMaxY1ForTimeRegion =
				$svgCoordsForLoveSongTypes.reduce(
					(accum, { loveSongType, svgCoords }) => {
						if (+loveSongType === +LOVE_SONG_TYPE_CONSTANTS.notALoveSong) {
							return accum;
						}
						const { y1, x } = svgCoords[index];
						// recall that y1 is the "top" of the chart visually, but in y-coordinates it is the smaller value (closer to the top of the canvas)
						return y1 < accum.y1 ? { y0: BASE_OF_CHART, y1, x } : accum;
					},
					{ y0: BASE_OF_CHART, y1: Infinity, x: Infinity }
				);
			return coordinateObjectWithMaxY1ForTimeRegion;
		});
	}
);

export const snakeChartOutlinePathGenerator = derived(
	[viewport],
	([$viewport]) => createSVGPathGenerator($viewport)
);
