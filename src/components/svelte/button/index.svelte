<script lang="ts">
  const { children, ...props } = $props();
</script>

<button {...props}>
  {@render children()}
</button>
