import { createEffect, createSignal, onCleanup } from 'solid-js';

export function Timer() {
  const [seconds, setSeconds] = createSignal(0);
  const [running, setRunning] = createSignal(false);

  createEffect(() => {
    if (!running()) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    onCleanup(() => clearInterval(interval));
  });

  const reset = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div class="timer">
      <span class="time">{seconds()}s</span>
      <button type="button" onClick={() => setRunning(!running())}>
        {running() ? 'Pause' : 'Start'}
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
