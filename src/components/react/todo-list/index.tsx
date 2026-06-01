import { useState } from 'react';

export function TodoList() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (!input.trim()) {
      return;
    }
    setItems((prev) => [...prev, input.trim()]);
    setInput('');
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list">
      <div className="todo-input">
        <input
          type="text"
          value={input}
          aria-label="New todo item"
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          placeholder="Add a todo..."
        />
        <button type="button" onClick={addItem}>
          Add
        </button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item}>
            <span>{item}</span>
            <button type="button" onClick={() => removeItem(index)}>
              ×
            </button>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p>No items yet</p>}
    </div>
  );
}
