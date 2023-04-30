<script>
	// Imports
	import { schemeDark2 } from 'd3-scale-chromatic';
	import { scaleLinear, scaleOrdinal } from 'd3-scale';
	import {createEventDispatcher} from 'svelte';
	import Controls from './controls.svelte';
	export let data;
	//testing slider
	let minute = 0
	let cont = "all"
	//
	// Dimensions of the image
	const height = 600;
	const width = 600;
	//TBMoved
	const heightDetails = 300;
	const widthDetails = 300;
	//
	// Lat/long and their scales
	const long = [...new Set(data.GPSTracking.map((/** @type {{ long: any; }} */ v) => v.long))];
	const longScale = scaleLinear().domain([Math.min(...long), Math.max(...long)]).range([0, height]);

	const lat = [...new Set(data.GPSTracking.map((/** @type {{ lat: any; }} */ v) => v.lat))];
	const latScale = scaleLinear().domain([Math.min(...lat), Math.max(...lat)]).range([0, width]);

	// TBMoved
	const longScaleDetails = scaleLinear().domain([Math.min(...long), Math.max(...long)]).range([0, heightDetails]);
	const latScaleDetails = scaleLinear().domain([Math.min(...lat), Math.max(...lat)]).range([0, widthDetails]);
	const test = 10000;
	///

	// Color scale
		const locationTypesUniques = [...new Set(data.pointsOfInterest.map((/** @type {{ type: any; }} */ v) => v.type))];
	const ordinalScale = scaleOrdinal(schemeDark2).domain(locationTypesUniques);

	// Selection toolbox
	const dispatch = createEventDispatcher();
	const u_ids = [...new Set(data.GPSTracking.map((v) => v.car_id))];
	let cur_id = 0; // Starting value
	function selectID() {
		dispatch('eee', {
			value: cur_id
		})
	}


</script>


<h1>Michał Chmura - KU Leuven - r0960234</h1>
<h2>Overview</h2>
<div>
<label for="dropDownCar">Select car to highlight:</label>
	<select bind:value={cur_id} on:change={selectID}>
		<option value={0}>-- Select car --</option>
		{#each u_ids as id}
			<option value={id}>Car {id}</option>
		{/each}
	</select><br />
	{#if cur_id !== 0}
		Go to <a href="details">details</a> for car {cur_id}.
	{/if}
</div>

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

<div>
	<a href="/routes">Car overview</a>
</div>
<div>
	<a href="/det">Previous car</a> <a href="/det">Next car</a>
</div>


<h1>Michał Chmura - KU Leuven - r0960234</h1>
<div>
	{#if cur_id !== 0}
	<h2><b> Details for car {cur_id}</b></h2>
	<Controls data={data} bind:minute={minute}/>

	{/if}
</div>

<svg {width} {height}>
	{#each data.GPSTracking as dp}
  		{#if dp.car_id === cur_id}
    	<circle cx={longScaleDetails(dp.long)} cy={heightDetails - latScaleDetails(dp.lat)} r="3" class:selected={dp.car_id == cur_id && minute >= dp.cumulative_minute_total - 15 && minute <= dp.cumulative_minute_total + 15}/>
  		{/if}

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
