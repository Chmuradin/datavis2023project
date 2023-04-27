<script>
    const heightDetails = 300;
	const widthDetails = 300;

    // Lat/long and their scales
	const longDetails = [...new Set(data.GPSTracking.map((/** @type {{ long: any; }} */ v) => v.long))];
	const longScaleDetails = scaleLinear().domain([Math.min(...long), Math.max(...long)]).range([0, heightDetails]);

	const latDetails = [...new Set(data.GPSTracking.map((/** @type {{ lat: any; }} */ v) => v.lat))];
	const latScaleDetails = scaleLinear().domain([Math.min(...lat), Math.max(...lat)]).range([0, widthDetails]);
</script>

<h1>Michał Chmura - KU Leuven - r0960234</h1>
<h2>Overview</h2>