import type { ButtonHTMLAttributes } from 'preact';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props;
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}
