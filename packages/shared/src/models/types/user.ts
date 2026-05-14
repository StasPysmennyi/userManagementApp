import { type Role } from '../enums';

export type User = {
  id: string;
  fullName: string;
  role: Role;
  dateOfBirthday: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserDto = {
  fullName: string;
  role: Role;
  dateOfBirthday?: string | null;
};

export type UpdateUserDto = Partial<CreateUserDto>;
