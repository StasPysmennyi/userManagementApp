import { z } from 'zod';

import { Role } from '../models/enums/role';

export const userFormSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full Name must be at least 3 characters')
    .max(50, 'Full Name must be at most 50 characters'),
  role: z.nativeEnum(Role, { message: 'Role is required' }),
  dateOfBirthday: z
    .string()
    .datetime({ offset: true, message: 'Must be a valid ISO date' })
    .optional()
    .or(z.literal('')),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
