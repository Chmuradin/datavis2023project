<script>
	import { scaleLinear } from 'd3-scale';
	import { goto } from '$app/navigation';
	import Scatter from './Scatter.svelte'
	import {Controls} from './Controls.svelte'
	export let data;
	function previousPage() {
		goto(`/details/${data.currentCarId - 1}`);
	}

	function nextPage() {
		goto(`/details/${data.currentCarId + 1}`);
	}
</script>


<div>
	<a href="/">Car overview</a>
</div>
<div>
	<a href="{'#'}" button on:click={previousPage}>Previous car</a> <a href="{'#'}" on:click={nextPage}>Next car</a>
</div>


<h1>Michał Chmura - KU Leuven - r0960234</h1>
<div>
	{#if data.currentCarId !== 0}
		<h2><b> Details for car {data.currentCarId}</b></h2>
	{/if}
	<h1>Current total minute {data.minuteSlider}</h1>
</div>

<div>
	<Controls data={data} bind:minute={data.minuteSlider}/>
</div>



<div>
	<Scatter data={data}/>
</div>

