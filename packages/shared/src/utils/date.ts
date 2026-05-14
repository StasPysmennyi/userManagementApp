import { DateTime } from 'luxon';

export const formatDate = (iso: string | null | undefined): string => {
  if (!iso) {
    return '—';
  }
  const dt = DateTime.fromISO(iso);
  return dt.isValid ? dt.toFormat('dd MMM yyyy') : '—';
};

export const toISOString = (date: Date): string =>
  DateTime.fromJSDate(date).toISO() ?? '';

export const fromISOToDate = (iso: string): Date | null => {
  const dt = DateTime.fromISO(iso);
  return dt.isValid ? dt.toJSDate() : null;
};

export const calculateAge = (iso: string | null | undefined): number | null => {
  if (!iso) {
    return null;
  }
  const dt = DateTime.fromISO(iso);
  if (!dt.isValid) {
    return null;
  }
  return Math.floor(DateTime.now().diff(dt, 'years').years);
};
