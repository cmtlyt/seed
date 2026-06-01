import type { JSX } from 'solid-js';

export function Button(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props;
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}
