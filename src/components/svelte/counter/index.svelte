<script lang="ts">
  let count = $state(0);
</script>

<div class="counter">
  <button type="button" onclick={() => count--}>-</button>
  <span>{count}</span>
  <button type="button" onclick={() => count++}>+</button>
</div>
