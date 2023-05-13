<script>
    // Dependencies
	import {scaleLinear} from 'd3-scale';
    export let data;
    // Dimensions, coordinates and scales
	const height = 300;
	const width = 300;
  	const long = [...new Set(data.GPSTracking.map((/** @type {{ long: any; }} */ v) => v.long))];
	const longScale = scaleLinear().domain([Math.min(...long), Math.max(...long)]).range([0, height]);
	const lat = [...new Set(data.GPSTracking.map((/** @type {{ lat: any; }} */ v) => v.lat))];
	const latScale = scaleLinear().domain([Math.min(...lat), Math.max(...lat)]).range([0, width]);
</script>

<svg {width} {height}>
    {#each data.GPSTrackingID as dp}
    <circle cx={longScale(dp.long)} cy={height - latScale(dp.lat)} r="3" class:selected={data.minuteSlider > dp.cumulative_minute_total - 15 && data.minuteSlider < dp.cumulative_minute_total + 15}/>
    {/each}
</svg>

<style>
	circle {
		fill-opacity: 0.1;
		fill: blue;
	}
	circle.selected {
		fill-opacity: 1;
		fill: red;
	}
</style>