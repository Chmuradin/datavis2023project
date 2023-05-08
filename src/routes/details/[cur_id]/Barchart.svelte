<script>
    import {scaleLinear} from "d3-array";

    export let data;
    const width = 300
    const height = 300

    $: yDomain = data.carStops.map((d) => d.start.day)
    $: xDomain = data.carStops.map((d) => d.start.time)
</script>

<svg {width} {height}>



</svg>