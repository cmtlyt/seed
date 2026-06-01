import { createSignal, For, Show } from 'solid-js';

export function TodoList() {
  const [items, setItems] = createSignal<string[]>([]);
  const [input, setInput] = createSignal('');

  const addItem = () => {
    if (!input().trim()) {
      return;
    }
    setItems((prev) => [...prev, input().trim()]);
    setInput('');
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div class="todo-list">
      <div class="todo-input">
        <input
          type="text"
          value={input()}
          aria-label="New todo item"
          onInput={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          placeholder="Add a todo..."
        />
        <button type="button" onClick={addItem}>
          Add
        </button>
      </div>
      <ul>
        <For each={items()}>
          {(item, index) => (
            <li>
              <span>{item}</span>
              <button type="button" onClick={() => removeItem(index())}>
                ×
              </button>
            </li>
          )}
        </For>
      </ul>
      <Show when={items().length === 0}>
        <p>No items yet</p>
      </Show>
    </div>
  );
}
