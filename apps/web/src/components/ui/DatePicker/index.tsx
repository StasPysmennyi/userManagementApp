import { formatDate } from '@uma/shared';
import { AnimatePresence, motion } from 'motion/react';

import { Icons } from 'src/components';

import { classNames } from 'src/utils';

import { CalendarView } from './CalendarView';
import { DROPDOWN_ANIMATION } from './constants';
import { Header } from './Header';
import { useDatePicker } from './useDatePicker';
import { YearView } from './YearView';

type Props = {
  label?: string;
  value?: string;
  error?: string;
  onChange: (iso: string) => void;
};

export const DatePicker = ({ label, value, error, onChange }: Props) => {
  const {
    today,
    selected,
    isOpen,
    mode,
    viewYear,
    viewMonth,
    yearPageStart,
    containerRef,
    isNextMonthDisabled,
    canGoNextYearPage,
    cells,
    years,
    handlePrev,
    handleNext,
    handleSelectDay,
    handleSelectYear,
    handleClear,
    handleToggle,
    handleToggleMode,
    setViewMonth,
  } = useDatePicker({ value, onChange });

  return (
    <div className="relative flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className={classNames(
          'flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm outline-none transition-all',
          error ? 'border-red-400' : 'border-slate-200',
          isOpen
            ? 'border-indigo-500 ring-2 ring-indigo-500/20'
            : 'hover:border-slate-300',
        )}>
        <span
          className={classNames(value ? 'text-slate-900' : 'text-slate-400')}>
          {value ? formatDate(value) : 'Select date'}
        </span>

        <div className="flex items-center gap-1.5 text-slate-400">
          {value && (
            <span
              onClick={handleClear}
              className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full hover:text-slate-600">
              <Icons.CloseIcon width={12} height={12} />
            </span>
          )}
          <Icons.CalendarIcon width={15} height={15} />
        </div>
      </button>

      {error && <span className="text-xs text-red-500">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...DROPDOWN_ANIMATION}
            className="absolute top-full left-0 z-50 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
            <Header
              mode={mode}
              viewMonth={viewMonth}
              viewYear={viewYear}
              yearPageStart={yearPageStart}
              isNextDisabled={isNextMonthDisabled}
              canGoNextYearPage={canGoNextYearPage}
              onPrev={handlePrev}
              onNext={handleNext}
              onToggleMode={handleToggleMode}
            />
            {mode === 'year' ? (
              <YearView
                years={years}
                viewYear={viewYear}
                today={today}
                onSelectYear={handleSelectYear}
              />
            ) : (
              <CalendarView
                cells={cells}
                viewYear={viewYear}
                viewMonth={viewMonth}
                today={today}
                selected={selected}
                onSelectDay={handleSelectDay}
                onSelectMonth={setViewMonth}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
