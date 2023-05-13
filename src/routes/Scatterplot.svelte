<script>
    // Dependencies
    import {schemeDark2} from 'd3-scale-chromatic';
	import {scaleLinear, scaleOrdinal} from 'd3-scale';
    // Properties
    export let data;
	export let cur_id;
    // Dimensions, coordinates and scales
	const height = 600;
	const width = 600;
  	const long = [...new Set(data.GPSTracking.map((/** @type {{ long: any; }} */ v) => v.long))];
	const longScale = scaleLinear().domain([Math.min(...long), Math.max(...long)]).range([0, height]);
	const lat = [...new Set(data.GPSTracking.map((/** @type {{ lat: any; }} */ v) => v.lat))];
	const latScale = scaleLinear().domain([Math.min(...lat), Math.max(...lat)]).range([0, width]);
    // Color schema
	const locationTypesUniques = [...new Set(data.pointsOfInterest.map((/** @type {{ type: any; }} */ v) => v.type))];
	const ordinalScale = scaleOrdinal(schemeDark2).domain(locationTypesUniques);
</script>

<svg {width} {height}>
	{#each data.GPSTracking as dp}
		<circle cx={longScale(dp.long)} cy={height - latScale(dp.lat)} r="3" class:selected={dp.car_id == cur_id}/>
	{/each}
	{#each data.pointsOfInterest as dpI}
		<circle cx={longScale(dpI.long)}
				cy={height - latScale(dpI.lat)}
				r="5"
				fill={ordinalScale(dpI.type)} 
				class="locationType">
			<title>{dpI.name}</title>
		</circle>
	{/each} 
</svg>

<style>
	circle {
		fill-opacity: 0.04;
	}
	circle.selected {
		fill-opacity: 1;
		fill: red;
	}
	circle.locationType {
		fill-opacity: 1;
	}
</style>