import { type ButtonHTMLAttributes } from 'react';

import { classNames } from 'src/utils';

import { SIZE_CLASSES, VARIANT_CLASSES } from './config';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: Props) => (
  <button
    disabled={disabled || isLoading}
    className={classNames(
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer',
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      className,
    )}
    {...props}>
    {isLoading && (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    )}
    {children}
  </button>
);
