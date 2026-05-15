type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50',
  secondary:
    'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 disabled:opacity-50',
  danger: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50',
  ghost: 'text-slate-600 hover:bg-slate-100 disabled:opacity-50',
};

export const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};
