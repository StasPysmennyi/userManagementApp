import { ENUMS } from 'src/models';

export const ROLE_OPTIONS = [
  { value: ENUMS.Role.STAFF, label: 'Staff' },
  { value: ENUMS.Role.MEMBER, label: 'Member' },
] as const;

export const ROLE_LABELS: Record<ENUMS.Role, string> = {
  [ENUMS.Role.STAFF]: 'Staff',
  [ENUMS.Role.MEMBER]: 'Member',
};
