import { calculateAge } from '@uma/shared';

describe('calculateAge', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-05-15'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns null for null', () => {
    expect(calculateAge(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(calculateAge(undefined)).toBeNull();
  });

  it('returns null for invalid ISO', () => {
    expect(calculateAge('not-a-date')).toBeNull();
  });

  it('returns correct age when birthday already passed this year', () => {
    // born 1990-01-01, today is 2025-05-15 → a birthday passed → 35
    expect(calculateAge('1990-01-01T00:00:00.000Z')).toBe(35);
  });

  it('returns correct age when birthday not yet this year', () => {
    // born 1990-12-01, today is 2025-05-15 → birthday not yet → 34
    expect(calculateAge('1990-12-01T00:00:00.000Z')).toBe(34);
  });

  it('returns 0 for someone born this year', () => {
    expect(calculateAge('2025-01-01T00:00:00.000Z')).toBe(0);
  });
});
