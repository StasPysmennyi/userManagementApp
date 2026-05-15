import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useOutsideClick } from 'src/hooks';

import { type Mode, YEAR_PAGE_SIZE } from './constants';
import { buildCalendarCells } from './utils';

type Params = {
  value?: string;
  onChange: (iso: string) => void;
};

const useDatePicker = ({ value, onChange }: Params) => {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

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

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setMode('calendar');
  }, []);

  useOutsideClick(containerRef, handleClose);

  const isNextMonthDisabled =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const canGoNextYearPage =
    yearPageStart + YEAR_PAGE_SIZE - 1 < today.getFullYear();

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    if (isNextMonthDisabled) {
      return;
    }
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  }, [viewMonth, isNextMonthDisabled]);

  const handlePrev = useCallback(() => {
    if (mode === 'calendar') {
      prevMonth();
    } else {
      setYearPageStart(s => s - YEAR_PAGE_SIZE);
    }
  }, [mode, prevMonth]);

  const handleNext = useCallback(() => {
    if (mode === 'calendar') {
      nextMonth();
    } else if (canGoNextYearPage) {
      setYearPageStart(s => s + YEAR_PAGE_SIZE);
    }
  }, [mode, nextMonth, canGoNextYearPage]);

  const handleSelectDay = useCallback(
    (day: number) => {
      const date = new Date(viewYear, viewMonth, day);
      if (date > today) {
        return;
      }
      onChange(date.toISOString());
      setIsOpen(false);
      setMode('calendar');
    },
    [viewYear, viewMonth, today, onChange],
  );

  const handleSelectYear = useCallback(
    (year: number) => {
      if (year > today.getFullYear()) {
        return;
      }
      setViewYear(year);
      if (year === today.getFullYear() && viewMonth > today.getMonth()) {
        setViewMonth(today.getMonth());
      }
      setMode('calendar');
    },
    [today, viewMonth],
  );

  const handleClear = useCallback(
    (e: ReactMouseEvent) => {
      e.stopPropagation();
      onChange('');
    },
    [onChange],
  );

  const handleToggle = useCallback(() => {
    setIsOpen(o => !o);
    setMode('calendar');
  }, []);

  const handleToggleMode = useCallback(() => {
    setMode(m => (m === 'year' ? 'calendar' : 'year'));
  }, []);

  const cells = buildCalendarCells(viewYear, viewMonth);
  const years = Array.from(
    { length: YEAR_PAGE_SIZE },
    (_, i) => yearPageStart + i,
  );

  return {
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
  };
};

export { useDatePicker };
