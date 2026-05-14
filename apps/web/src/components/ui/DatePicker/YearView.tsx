import { classNames } from 'src/utils';

type Props = {
  years: number[];
  viewYear: number;
  today: Date;
  onSelectYear: (year: number) => void;
};

export const YearView = ({ years, viewYear, today, onSelectYear }: Props) => (
  <div className="grid grid-cols-3 gap-1.5">
    {years.map(year => {
      const isFuture = year > today.getFullYear();
      const isActive = year === viewYear;

      return (
        <button
          key={year}
          type="button"
          disabled={isFuture}
          onClick={() => onSelectYear(year)}
          className={classNames(
            'rounded-lg py-2 text-sm font-medium transition-colors',
            isFuture
              ? 'cursor-not-allowed text-slate-300'
              : 'hover:bg-indigo-50 hover:text-indigo-600',

            isActive
              ? 'bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white'
              : 'text-slate-700',
          )}>
          {year}
        </button>
      );
    })}
  </div>
);
