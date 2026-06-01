import { createSignal, For } from 'solid-js';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const contents = [
  'This is the content of Tab 1. Solid uses fine-grained reactivity.',
  'This is the content of Tab 2. No Virtual DOM — direct DOM updates.',
  'This is the content of Tab 3. Signals only re-run what depends on them.',
];

export function Tabs() {
  const [activeIndex, setActiveIndex] = createSignal(0);

  return (
    <div class="tabs">
      <div class="tab-headers">
        <For each={tabs}>
          {(tab, index) => (
            <button
              type="button"
              classList={{ active: index() === activeIndex() }}
              onClick={() => setActiveIndex(index())}
            >
              {tab}
            </button>
          )}
        </For>
      </div>
      <div class="tab-content">
        <p>{contents[activeIndex()]}</p>
      </div>
    </div>
  );
}
