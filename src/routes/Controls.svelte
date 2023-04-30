<script>
    // Properties
    export let data = [];
    export let minute = 0; //1800
    let timer = false;
    let clicked = false; 
    function increment() { 
      minute == 20160 ? minute = 0 : minute += 1
    }
    function start() {
      if (timer == false) {
        timer = setInterval(increment, 10); 
        clicked = true;
      } else {
        clearInterval(timer); 
        timer = false;
        clicked = false; 
      }
    } 
    function reset() {
      clearInterval(timer);
      timer = false;
      minute = 0;
      clicked = false; 
    } 
  </script>
  
  <div class="row">
    <div>
      {#if clicked == false}
        <button class="btn btn-success" on:click={start}>Start</button>
      {:else}
        <button class="btn btn-danger" on:click={start}>Stop</button>
      {/if}
        <button class="btn btn-secondary" on:click={reset}>Reset</button>
    </div>
    <div>
      <input type="range" class="form-range" min="0" max="20160" bind:value={minute} id="slider" style="margin: 0; width: 300px;">
    </div> 
    
  
  </div>