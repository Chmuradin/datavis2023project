<script>
    import {cur_id, width, height, data} from '/src/routes/+page.svelte'
	const heightDetails = 300;
	const widthDetails = 300;
	// also long and lat scales
	const longScaleDetails = scaleLinear().domain([Math.min(...long), Math.max(...long)]).range([0, heightDetails]);
	const latScaleDetails = scaleLinear().domain([Math.min(...lat), Math.max(...lat)]).range([0, widthDetails]);
	const test = 10000;



</script>


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

	{/if}
</div>

<svg {width} {height}>
	{#each data.GPSTracking as dp}
  		{#if dp.car_id === cur_id}
    	<circle cx={longScaleDetails(dp.long)} cy={heightDetails - latScaleDetails(dp.lat)} r="3" class:selected={dp.car_id == cur_id && test >= dp.cumulative_minute_total - 15 && test <= dp.cumulative_minute_total + 15}/>
  		{/if}

	{/each}

	
</svg>




<style>
	circle {
		fill-opacity: 0.04;
	}

	circle.selected {
		fill-opacity: 0.99;
		fill: red;
	}

	

</style>
