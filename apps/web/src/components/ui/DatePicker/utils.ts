export const buildCalendarCells = (
  viewYear: number,
  viewMonth: number,
): (number | null)[] => {
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOffset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;
  const trailingNulls = totalCells - firstDayOffset - daysInMonth;

  return [
    ...Array<null>(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array<null>(trailingNulls).fill(null),
  ];
};
