<script>
	// Imports
	import {createEventDispatcher} from 'svelte';
  import Scatterplot from './Scatterplot.svelte';
	
	export let data = [];
	
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
		Go to <a href="details/{cur_id}/">details</a> for car {cur_id}.
	{/if}
</div>

<div>
	<Scatterplot data={data} cur_id={cur_id}/>
</div>