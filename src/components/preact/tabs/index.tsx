import { useState } from 'preact/hooks';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const contents = [
  'This is the content of Tab 1. Preact uses the same hooks API as React.',
  'This is the content of Tab 2. Lightweight alternative to React (3KB).',
  'This is the content of Tab 3. Fast Virtual DOM diffing.',
];

export function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tab-headers">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={index === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <p>{contents[activeIndex]}</p>
      </div>
    </div>
  );
}
