import { Icons } from 'src/components';

import { classNames } from 'src/utils';

import { type Mode, MONTHS, YEAR_PAGE_SIZE } from './constants';

type Props = {
  mode: Mode;
  viewMonth: number;
  viewYear: number;
  yearPageStart: number;
  isNextDisabled: boolean;
  canGoNextYearPage: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleMode: () => void;
};

export const Header = ({
  mode,
  viewMonth,
  viewYear,
  yearPageStart,
  isNextDisabled,
  canGoNextYearPage,
  onPrev,
  onNext,
  onToggleMode,
}: Props) => {
  const nextDisabled =
    mode === 'calendar' ? isNextDisabled : !canGoNextYearPage;

  return (
    <div className="mb-3 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800">
        <Icons.ChevronIcon width={16} height={16} direction="left" />
      </button>

      <button
        type="button"
        onClick={onToggleMode}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100">
        {mode === 'calendar'
          ? `${MONTHS[viewMonth]} ${viewYear}`
          : `${yearPageStart} – ${yearPageStart + YEAR_PAGE_SIZE - 1}`}
        <Icons.ChevronIcon
          width={12}
          height={12}
          direction={mode === 'year' ? 'up' : 'down'}
        />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={classNames(
          'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
          nextDisabled
            ? 'cursor-not-allowed text-slate-300'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
        )}>
        <Icons.ChevronIcon width={16} height={16} direction="right" />
      </button>
    </div>
  );
};
