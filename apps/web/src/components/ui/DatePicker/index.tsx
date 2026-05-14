import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { formatDate } from '@uma/shared';
import { AnimatePresence, motion } from 'motion/react';

import { Icons } from 'src/components';

import { classNames } from 'src/utils';

import { CalendarView } from './CalendarView';
import { type Mode, YEAR_PAGE_SIZE } from './constants';
import { Header } from './Header';
import { YearView } from './YearView';

type Props = {
  label?: string;
  value?: string;
  error?: string;
  onChange: (iso: string) => void;
};

export const DatePicker = ({ label, value, error, onChange }: Props) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = value ? new Date(value) : null;
  if (selected) {
    selected.setHours(0, 0, 0, 0);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('calendar');
  const [viewYear, setViewYear] = useState(
    selected?.getFullYear() ?? today.getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    selected?.getMonth() ?? today.getMonth(),
  );
  const [yearPageStart, setYearPageStart] = useState(
    () => today.getFullYear() - YEAR_PAGE_SIZE + 1,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setMode('calendar');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isNextMonthDisabled =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const canGoNextYearPage =
    yearPageStart + YEAR_PAGE_SIZE - 1 < today.getFullYear();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (isNextMonthDisabled) {
      return;
    }
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (date > today) {
      return;
    }
    onChange(date.toISOString());
    setIsOpen(false);
    setMode('calendar');
  };

  const handleSelectYear = (year: number) => {
    if (year > today.getFullYear()) {
      return;
    }
    setViewYear(year);
    if (year === today.getFullYear() && viewMonth > today.getMonth()) {
      setViewMonth(today.getMonth());
    }
    setMode('calendar');
  };

  const handleClear = (e: ReactMouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOffset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const cells: (number | null)[] = [
    ...Array<null>(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const years = Array.from(
    { length: YEAR_PAGE_SIZE },
    (_, i) => yearPageStart + i,
  );

  return (
    <div className="relative flex flex-col gap-1.5" ref={containerRef}>
      {label ? (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsOpen(o => !o);
          setMode('calendar');
        }}
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
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </button>

      {error ? <span className="text-xs text-red-500">{error}</span> : null}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 z-50 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
            <Header
              mode={mode}
              viewMonth={viewMonth}
              viewYear={viewYear}
              yearPageStart={yearPageStart}
              isNextDisabled={isNextMonthDisabled}
              canGoNextYearPage={canGoNextYearPage}
              onPrev={
                mode === 'calendar'
                  ? prevMonth
                  : () => setYearPageStart(s => s - YEAR_PAGE_SIZE)
              }
              onNext={
                mode === 'calendar'
                  ? nextMonth
                  : () => {
                      if (canGoNextYearPage) {
                        setYearPageStart(s => s + YEAR_PAGE_SIZE);
                      }
                    }
              }
              onToggleMode={() =>
                setMode(m => (m === 'year' ? 'calendar' : 'year'))
              }
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
        ) : null}
      </AnimatePresence>
    </div>
  );
};
