<script>
	// Dependencies
	import {goto} from '$app/navigation';
	import Scatter from './Scatter.svelte'
	import Slider from './Slider.svelte'
	import Barchart from './Barchart.svelte'
	export let data;
	// Iterator - written because I wanted to skip unwanted ids
	const u_ids = [...new Set(data.GPSTracking.map((v) => v.car_id))];
	let cursor = u_ids.findIndex((id) => id === data.currentCarId);

	function iter(cursor, array) {
		function next() {
			const nextIndex = cursor + 1;
			if(isIndexInbound(nextIndex, array)) {
				return {
					value: array[nextIndex],
					nextCursor: nextIndex,
				}
			}
			return {nextCursor: cursor, value: array[cursor]};
		}
		function previous() {
			const nextIndex = cursor - 1;
			if(isIndexInbound(nextIndex, array)) {
				return {
					value: array[nextIndex],
					nextCursor: nextIndex,
				}
			}

			return {nextCursor: cursor, value: array[cursor]};
		}

		function isIndexInbound(index, array) {
			return index <= array.length - 1 && index >= 0;
		}

		return { next, previous };
	} 

	function previousPage() {
		const { value, nextCursor } = iter(cursor, u_ids).previous();

		console.log(value, nextCursor);

		cursor = nextCursor;
		
		goto(`/details/${value}`);
	}

	function nextPage() {
		const { value, nextCursor } = iter(cursor, u_ids).next();
		cursor = nextCursor;
		
		console.log(value, nextCursor);

		goto(`/details/${value}`);
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
</div>
<div>
	<Slider data={data} onChange={(event)=>{data.minuteSlider = event.target.value}}/>
</div>
<div>
	<Scatter data={data}/>
	<Barchart data={data}/>
</div>