<script>
    // Properties
    export let datar;
    export const ssr = false;
    export let onChange;

</script>
    
<div>
  <input type="range" class="form-range" min="0" max="20160" bind:value={datar.minuteSlider} on:change={onChange} id="slider" style="margin: 0; width: 300px;">
</div> 
    
  
  