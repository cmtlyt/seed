<script lang="ts">
  let items = $state<string[]>([]);
  let input = $state('');

  function addItem() {
    if (!input.trim()) {return;}
    items = [...items, input.trim()];
    input = '';
  }

  function removeItem(index: number) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<div class="todo-list">
  <div class="todo-input">
    <input
      type="text"
      bind:value={input}
      onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && addItem()}
      placeholder="Add a todo..."
    />
    <button type="button" onclick={addItem}>Add</button>
  </div>
  <ul>
    {#each items as item, index}
      <li>
        <span>{item}</span>
        <button type="button" onclick={() => removeItem(index)}>×</button>
      </li>
    {/each}
  </ul>
  {#if items.length === 0}
    <p>No items yet</p>
  {/if}
</div>
