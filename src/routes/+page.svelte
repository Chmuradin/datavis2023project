<script>
	// Imports
	import { schemeDark2 } from 'd3-scale-chromatic';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	export let data;

	// Dimensions of the image
	const height = 650;
	const width = 650;

	// Lat/long and their scales
	const longs = [...new Set(data.GPSTracking.map((/** @type {{ long: any; }} */ v) => v.long))];
	const longScale = scaleLinear().domain([Math.min(...longs), Math.max(...longs)]).range([0, height]);

	const lats = [...new Set(data.GPSTracking.map((/** @type {{ lat: any; }} */ v) => v.lat))];
	const latScale = scaleLinear().domain([Math.min(...lats), Math.max(...lats)]).range([0, width]);

	// Color scale
	const locationTypesUniques = [...new Set(data.pointsOfInterest.map((/** @type {{ type: any; }} */ v) => v.type))];
	const ordinalScale = scaleOrdinal(schemeDark2).domain(locationTypesUniques);
</script>

<h1>Michał Chmura - KU Leuven - r0960234</h1>
<h2>Overview</h2>
<div>
Select car to highlight:

</div>

<svg {width} {height}>
	{#each data.GPSTracking as dp}
		<circle cx={longScale(dp.long)} cy={height - latScale(dp.lat)} r="2" class="GPSTracking"/>
	{/each}
	{#each data.pointsOfInterest as dp}
		<circle
			cx={longScale(dp.long)}
			cy={height - latScale(dp.lat)}
			r="5"
			fill={ordinalScale(dp.type)}
			class="locationType"
		/>
	{/each}
</svg>

<style>
	circle.GPSTracking {
		fill-opacity: 0.04;
	}
	circle.locationType {
		fill-opacity: 1;
	}
</style>
