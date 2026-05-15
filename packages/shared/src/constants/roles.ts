import { Role } from '../models/enums/role';

export const ROLE_OPTIONS = [
  { value: Role.STAFF, label: 'Staff' },
  { value: Role.MEMBER, label: 'Member' },
] as const;

export const ROLE_LABELS: Record<Role, string> = {
  [Role.STAFF]: 'Staff',
  [Role.MEMBER]: 'Member',
};
