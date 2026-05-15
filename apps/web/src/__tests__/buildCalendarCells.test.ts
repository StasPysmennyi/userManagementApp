import { describe, expect, it } from 'vitest';

import { buildCalendarCells } from 'src/components/ui/DatePicker/utils';

describe('buildCalendarCells', () => {
  it('total length is always divisible by 7', () => {
    // test several months with different starting days
    const cases: [number, number][] = [
      [2024, 0], // Jan — starts Monday
      [2024, 1], // Feb — leap year, starts Thursday
      [2024, 8], // Sep — starts Sunday (max leading nulls = 6)
      [2025, 1], // Feb — starts Saturday
    ];

    cases.forEach(([year, month]) => {
      const cells = buildCalendarCells(year, month);
      expect(cells.length % 7).toBe(0);
    });
  });

  it('January 2024 — starts Monday, no leading nulls', () => {
    const cells = buildCalendarCells(2024, 0);
    // Mon = firstDayOffset 0, 31 days, 4 trailing nulls → 35 cells
    expect(cells.length).toBe(35);
    expect(cells[0]).toBe(1);
    expect(cells[30]).toBe(31);
    expect(cells[31]).toBeNull();
  });

  it('September 2024 — starts Sunday, 6 leading nulls', () => {
    const cells = buildCalendarCells(2024, 8);
    // Sun = firstDayOffset 6, 30 days, 6 trailing nulls → 42 cells
    expect(cells.length).toBe(42);
    expect(cells[0]).toBeNull();
    expect(cells[5]).toBeNull();
    expect(cells[6]).toBe(1);
    expect(cells[35]).toBe(30);
    expect(cells[36]).toBeNull();
  });

  it('February 2024 — leap year, 29 days', () => {
    const cells = buildCalendarCells(2024, 1);
    const days = cells.filter(c => c !== null);
    expect(days).toHaveLength(29);
    expect(days[days.length - 1]).toBe(29);
  });

  it('February 2025 — non-leap year, 28 days', () => {
    const cells = buildCalendarCells(2025, 1);
    const days = cells.filter(c => c !== null);
    expect(days).toHaveLength(28);
    expect(days[days.length - 1]).toBe(28);
  });

  it('days always run from 1 to last day of month with no gaps', () => {
    const cells = buildCalendarCells(2024, 4); // May 2024
    const days = cells.filter((c): c is number => c !== null);
    expect(days).toEqual(Array.from({ length: 31 }, (_, i) => i + 1));
  });
});
