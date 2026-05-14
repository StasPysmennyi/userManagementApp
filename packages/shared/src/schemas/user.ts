import { z as ZOD } from 'zod';

import { Role } from '../models/enums';

export const userFormSchema = ZOD.object({
  fullName: ZOD.string()
    .min(3, 'Full Name must be at least 3 characters')
    .max(50, 'Full Name must be at most 50 characters'),

  role: ZOD.enum(Role, { message: 'Role is required' }),

  dateOfBirthday: ZOD.iso
    .datetime({ offset: true, message: 'Must be a valid ISO date' })
    .refine(val => new Date(val) <= new Date(), {
      message: 'Date of birthday cannot be in the future',
    })
    .optional()
    .or(ZOD.literal('')),
});

export type UserFormValues = ZOD.infer<typeof userFormSchema>;

export const userUpdateSchema = userFormSchema.partial().extend({
  dateOfBirthday: ZOD.iso
    .datetime({ offset: true, message: 'Must be a valid ISO date' })
    .nullable()
    .optional()
    .or(ZOD.literal('')),
});
