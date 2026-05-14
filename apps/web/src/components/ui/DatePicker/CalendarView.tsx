import { classNames } from 'src/utils';

import { MONTHS_SHORT, WEEK_DAYS } from './constants';

type Props = {
  cells: (number | null)[];
  viewYear: number;
  viewMonth: number;
  today: Date;
  selected: Date | null;
  onSelectDay: (day: number) => void;
  onSelectMonth: (month: number) => void;
};

export const CalendarView = ({
  cells,
  viewYear,
  viewMonth,
  today,
  selected,
  onSelectDay,
  onSelectMonth,
}: Props) => (
  <>
    <div className="mb-1 grid grid-cols-7 text-center">
      {WEEK_DAYS.map(day => (
        <span key={day} className="py-1 text-xs font-medium text-slate-400">
          {day}
        </span>
      ))}
    </div>

    <div className="grid grid-cols-7 gap-y-0.5">
      {cells.map((day, i) => {
        if (!day) {
          return <span key={i} />;
        }

        const date = new Date(viewYear, viewMonth, day);
        const isFuture = date > today;
        const isSelected = selected && date.getTime() === selected.getTime();
        const isToday = date.getTime() === today.getTime();

        return (
          <button
            key={i}
            type="button"
            disabled={isFuture}
            onClick={() => onSelectDay(day)}
            className={classNames(
              'mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors',
              isFuture
                ? 'cursor-not-allowed text-slate-300'
                : 'hover:bg-indigo-50 hover:text-indigo-600',
              isSelected
                ? 'bg-indigo-600 font-semibold text-white hover:bg-indigo-600 hover:text-white'
                : '',
              isToday && !isSelected ? 'font-semibold text-indigo-600' : '',
            )}>
            {day}
          </button>
        );
      })}
    </div>

    <div className="mt-3 grid grid-cols-6 gap-1 border-t border-slate-100 pt-3">
      {MONTHS_SHORT.map((m, i) => {
        const isFuture =
          viewYear === today.getFullYear() && i > today.getMonth();

        const isActive = i === viewMonth;

        return (
          <button
            key={m}
            type="button"
            disabled={isFuture}
            onClick={() => onSelectMonth(i)}
            className={classNames(
              'rounded-md py-1 text-xs font-medium transition-colors',
              isFuture
                ? 'cursor-not-allowed text-slate-300'
                : 'hover:bg-indigo-50 hover:text-indigo-600',
              isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500',
            )}>
            {m}
          </button>
        );
      })}
    </div>
  </>
);
