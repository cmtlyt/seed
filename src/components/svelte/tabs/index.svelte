<script lang="ts">
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  const contents = [
    'This is the content of Tab 1. Svelte compiles away the framework.',
    'This is the content of Tab 2. Runes ($state) for reactive state.',
    'This is the content of Tab 3. No runtime overhead.',
  ];

  let activeIndex = $state(0);
</script>

<div class="tabs">
  <div class="tab-headers">
    {#each tabs as tab, index}
      <button
        type="button"
        class:active={index === activeIndex}
        onclick={() => (activeIndex = index)}
      >
        {tab}
      </button>
    {/each}
  </div>
  <div class="tab-content">
    <p>{contents[activeIndex]}</p>
  </div>
</div>
