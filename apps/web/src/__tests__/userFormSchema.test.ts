import { describe, expect, it } from 'vitest';

import { userFormSchema } from '@uma/shared';
import { Role } from '@uma/shared';

describe('userFormSchema', () => {
  it('validates a valid user form', () => {
    const result = userFormSchema.safeParse({
      fullName: 'John Doe',
      role: Role.MEMBER,
      dateOfBirthday: '1990-01-01T00:00:00.000Z',
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional dateOfBirthday', () => {
    const result = userFormSchema.safeParse({
      fullName: 'Jane Smith',
      role: Role.STAFF,
    });
    expect(result.success).toBe(true);
  });

  it('rejects fullName shorter than 3 characters', () => {
    const result = userFormSchema.safeParse({
      fullName: 'Jo',
      role: Role.MEMBER,
    });
    expect(result.success).toBe(false);
  });

  it('rejects fullName longer than 50 characters', () => {
    const result = userFormSchema.safeParse({
      fullName: 'A'.repeat(51),
      role: Role.MEMBER,
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid role', () => {
    const result = userFormSchema.safeParse({
      fullName: 'John Doe',
      role: 'ADMIN',
    });
    expect(result.success).toBe(false);
  });

  it('rejects non-ISO dateOfBirthday', () => {
    const result = userFormSchema.safeParse({
      fullName: 'John Doe',
      role: Role.MEMBER,
      dateOfBirthday: '1990-13-45',
    });
    expect(result.success).toBe(false);
  });
});
