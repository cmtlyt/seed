<script lang="ts">
  let seconds = $state(0);
  let running = $state(false);

  $effect(() => {
    if (!running) {return;}
    const interval = setInterval(() => {
      seconds++;
    }, 1000);
    return () => clearInterval(interval);
  });

  function reset() {
    running = false;
    seconds = 0;
  }
</script>

<div class="timer">
  <span class="time">{seconds}s</span>
  <button type="button" onclick={() => (running = !running)}>
    {running ? 'Pause' : 'Start'}
  </button>
  <button type="button" onclick={reset}>Reset</button>
</div>
