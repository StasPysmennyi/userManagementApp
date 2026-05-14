import { type ButtonHTMLAttributes } from 'react';

import { classNames } from 'src/utils';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 disabled:opacity-50',
  danger: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50',
  ghost: 'text-slate-600 hover:bg-slate-100 disabled:opacity-50',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
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
    {isLoading ? (
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    ) : null}
    {children}
  </button>
);
