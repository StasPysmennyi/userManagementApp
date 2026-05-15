import { classNames } from 'src/utils';

type Props = {
  day: number;
  viewYear: number;
  viewMonth: number;
  today: Date;
  selected: Date | null;
  onSelect: (day: number) => void;
};

export const DayCell = ({
  day,
  viewYear,
  viewMonth,
  today,
  selected,
  onSelect,
}: Props) => {
  const date = new Date(viewYear, viewMonth, day);
  const isFuture = date > today;
  const isSelected = selected && date.getTime() === selected.getTime();
  const isToday = date.getTime() === today.getTime();

  return (
    <button
      type="button"
      disabled={isFuture}
      onClick={() => onSelect(day)}
      className={classNames(
        'mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors',
        isFuture
          ? 'cursor-not-allowed text-slate-300'
          : 'hover:bg-indigo-50 hover:text-indigo-600',

        isSelected &&
          'bg-indigo-600 font-semibold text-white hover:bg-indigo-600 hover:text-white',
        isToday && !isSelected && 'font-semibold text-indigo-600',
      )}>
      {day}
    </button>
  );
};
