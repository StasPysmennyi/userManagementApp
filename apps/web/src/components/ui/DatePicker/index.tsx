import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from 'src/utils';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
  error?: string;
};

export const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? 'date-picker';

    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          type="date"
          className={cn(
            'rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors',
            'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
              : '',
            className,
          )}
          {...props}
        />
        {error ? <span className="text-xs text-red-500">{error}</span> : null}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
