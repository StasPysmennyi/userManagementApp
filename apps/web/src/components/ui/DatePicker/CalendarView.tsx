import { classNames } from 'src/utils';

import { MONTHS_SHORT, WEEK_DAYS } from './constants';
import { DayCell } from './DayCell';

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
      {cells.map((day, i) =>
        day ? (
          <DayCell
            key={i}
            day={day}
            viewYear={viewYear}
            viewMonth={viewMonth}
            today={today}
            selected={selected}
            onSelect={onSelectDay}
          />
        ) : (
          <span key={i} />
        ),
      )}
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
