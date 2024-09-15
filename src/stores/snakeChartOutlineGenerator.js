import { derived } from "svelte/store";
import { area as d3area } from "d3";
import viewport from "./viewport";

import { getYPosInAggregateSnakeChart } from "./forcePositionOptions-helper";
import { getXPosForYear } from "$data/data-utils";
import { LOVE_SONG_TYPES } from "$data/data-constants.js";

const BASE_OF_CHART = 0;
const createSVGPathGenerator = ($viewport) => {
	return d3area()
		.x(({ x }) => getXPosForYear(x, $viewport.width))
		.y0(({ y0, y1 }) =>
			getYPosInAggregateSnakeChart({
				percentage: BASE_OF_CHART,
				percentageChange: BASE_OF_CHART - y1,
				canvasHeight: $viewport.height,
				isY0: true
			})
		)
		.y1(({ y0, y1 }) =>
			getYPosInAggregateSnakeChart({
				percentage: y1,
				canvasHeight: $viewport.height,
				percentageChange: BASE_OF_CHART - y1
			})
		);
};

const TRANSITION_WIDTH_BETWEEN_TIME_REGIONS = 1.8; // in years. NOTE: regions are already a year apart, accounted for below
const getSvgCoordsForLoveSongType = (
	loveSongType,
	aggregateSnakeChartPositions
) =>
	aggregateSnakeChartPositions.reduce((accum, timeRegion) => {
		const { y0, y1 } =
			timeRegion.popularityScoreSumsInTimeRegion[loveSongType] || {};
		return [
			...accum,
			{
				x: timeRegion.start,
				y0,
				y1
			},
			{
				x: timeRegion.stop - (TRANSITION_WIDTH_BETWEEN_TIME_REGIONS - 1),
				y0,
				y1
			}
		];
	}, []);

export const svgCoordsForLoveSongTypes = derived(
	[aggregateSnakeChartPositions],
	([$aggregateSnakeChartPositions]) =>
		LOVE_SONG_TYPES.map((loveSongType) => ({
			loveSongType,
			svgCoords: getSvgCoordsForLoveSongType(
				loveSongType,
				$aggregateSnakeChartPositions
			)
		}))
);

export const snakeChartOutlinePathGenerator = derived(
	[viewport],
	([$viewport]) => createSVGPathGenerator($viewport)
);
