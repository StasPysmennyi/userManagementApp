import { formatDate } from '@uma/shared';
import { describe, expect, it } from 'vitest';

describe('formatDate', () => {
  it('formats a valid ISO date', () => {
    expect(formatDate('1990-06-15T00:00:00.000Z')).toBe('15 Jun 1990');
  });

  it('returns dash for null', () => {
    expect(formatDate(null)).toBe('—');
  });

  it('returns dash for undefined', () => {
    expect(formatDate(undefined)).toBe('—');
  });

  it('returns dash for invalid ISO', () => {
    expect(formatDate('not-a-date')).toBe('—');
  });
});
