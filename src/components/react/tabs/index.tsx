import { useState } from 'react';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const contents = [
  'This is the content of Tab 1. React uses useState for state management.',
  'This is the content of Tab 2. Conditional rendering with && and ternary.',
  'This is the content of Tab 3. Components re-render when state changes.',
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
