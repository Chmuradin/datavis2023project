<script>
    // Dependencies
    export let data;
    export const ssr = false;
    export let onChange;
</script>
    
<div>
  <input type="range" class="form-range" min="0" max="20160" bind:value={data.minuteSlider} on:change={onChange} id="slider" style="width: 300px;">
</div> 