import { useEffect, type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import { logger } from '@logger';

export function Button(props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  const { children, ...rest } = props;

  useEffect(() => {
    logger.appear('Button', 'rendered');
  }, []);

  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}
