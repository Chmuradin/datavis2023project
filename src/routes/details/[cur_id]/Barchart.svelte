<script>
	// Dependencies
	import {schemeDark2} from 'd3-scale-chromatic';
    import {scaleLinear, scaleQuantize, scaleOrdinal} from "d3-scale";
	import {select} from 'd3-selection';
	import {axisLeft, axisBottom} from 'd3-axis';
	import * as _ from 'underscore';
    export let data;
    // Dimensions, coordinates and scales
	const height = 300
    const width = 275
    const margins = {left: 20, bottom: 0, right: 5};
	const duration_scale = scaleLinear().domain([0, 86400]).range([0, width]);
	const scaleX = scaleLinear().domain([0, 1440]).range([0, width]);
	const scaleY = scaleQuantize().domain([0, 20160]).range(_.range(6, 20));
	// Color schema
	const locationTypesUniques = [...new Set(data.pointsOfInterest.map((/** @type {{ type: any; }} */ v) => v.type))];
	const ordinalScale = scaleOrdinal(schemeDark2).domain(locationTypesUniques);
	// Scale of axis
	const xScale = scaleLinear().domain([0,24]).range([0, 275]);
	const yScale = scaleLinear().domain(_.range(6, 19 + 1)).range([0 + 8, 20 + 8]);
	const xAxis = (node) => axisBottom(xScale).tickValues([0,6,12,18,24]).tickSize(-300)(select(node));
	const yAxis = (node) => axisLeft(yScale).tickSize(0)(select(node));
</script>

<svg width={margins.left + width + margins.right} {height}>
	{#each data.carStopsID as dpS}
		<rect
			x={margins.left + duration_scale(dpS.start.time)}
			y={(dpS.start.day - 6) * 20}
			height="19"
			width={duration_scale(dpS.end.time - dpS.start.time)}
			fill={ordinalScale(dpS.location.location_type)}
			><title>{dpS.start.time}-{dpS.end.time}: {dpS.location.name} ({dpS.location.location_type})</title
			></rect>
	{/each}
	<rect
		x={data.minuteSlider != 20160 ? margins.left + scaleX((data.minuteSlider % 1440)) : scaleX(1545)}
		y={(scaleY(data.minuteSlider) - 6) * 20}
		height="19"
		width="3"
		fill="black"/>
	<g transform="translate({margins.left}, {margins.bottom})">
		<g use:xAxis transform="translate(0, {20 * 14 - 1})"/>
		<g use:yAxis/>
	</g>
</svg>