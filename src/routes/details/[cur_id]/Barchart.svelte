<script>
	// Dependencies
    import {scaleLinear, scaleQuantize, scaleOrdinal} from "d3-scale";
	import * as _ from 'underscore';
	import { axisBottom, axisLeft } from 'd3-axis';
	import { select } from 'd3-selection';
    import { schemeDark2 } from 'd3-scale-chromatic';
    export let data;
    // Dimensions, coordinates and scales
    const width = 300
    const height = 300
    const margins = {left: 150, top: 0, bottom: 0, right: 150};
	const duration_scale = scaleLinear().domain([0, 86400]).range([0, width]);
	const line_scale_x = scaleLinear().domain([0, 1440]).range([0, width]);
	const line_scale_y = scaleQuantize().domain([0, 20160]).range(_.range(6, 19 + 1));
	// Color schema
	const locationTypesUniques = [...new Set(data.pointsOfInterest.map((/** @type {{ type: any; }} */ v) => v.type))];
	const ordinalScale = scaleOrdinal(schemeDark2).domain(locationTypesUniques);
	// Scale of axis
	const xScale = scaleLinear().domain([0,24]).range([0, 300]);
	const yScale = scaleLinear().domain(_.range(6, 19 + 1)).range([0 + 8, 16 + 8]);
	const xAxis = (node) => axisBottom(xScale).tickSize(-300)(select(node));
	const yAxis = (node) => axisLeft(yScale).tickSize(0)(select(node));
</script>

<svg width={margins.left + width + margins.right} {height}>
	{#each data.carStopsID as dpS}
		<rect
			x={margins.left + duration_scale(dpS.start.time)}
			y={(dpS.start.day - 6) * 16}
			height="15"
			width={duration_scale(dpS.end.time - dpS.start.time)}
			fill={ordinalScale(dpS.location.location_type)}
			><title>{dpS.start.time}-{dpS.end.time}: {dpS.location.name} ({dpS.location.location_type})</title
			></rect
		>
	{/each}
	<rect
		x={margins.left + line_scale_x((data.minuteSlider % 1441) - 1)}
		y={(line_scale_y(data.minuteSlider) - 6) * 16}
		height="15"
		width="3"
		fill="black"
	/>
	<g transform="translate({margins.left}, {margins.top})">
		<g use:xAxis transform="translate(0, {16 * 14 - 1})" id="xAxis" />
		<g use:yAxis fill="red" />
	</g>
</svg>
