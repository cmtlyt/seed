import { createSignal } from 'solid-js';

export function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="counter">
      <button type="button" onClick={() => setCount((prev) => prev - 1)}>
        -
      </button>
      <span>{count()}</span>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        +
      </button>
    </div>
  );
}
