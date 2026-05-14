import { forwardRef, type SelectHTMLAttributes } from 'react';

import { cn } from 'src/utils';

type Option = { value: string; label: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors',
            'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
              : '',
            !props.value ? 'text-slate-400' : '',
            className,
          )}
          {...props}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
      </div>
    );
  },
);

Select.displayName = 'Select';
