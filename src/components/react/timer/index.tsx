import { useEffect, useState } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <span className="time">{seconds}s</span>
      <button type="button" onClick={() => setRunning(!running)}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
