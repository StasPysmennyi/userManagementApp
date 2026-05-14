import { classNames } from 'src/utils';
import { ENUMS } from 'src/models';

type Props = {
  role: ENUMS.Role;
};

const ROLE_STYLES: Record<ENUMS.Role, string> = {
  [ENUMS.Role.STAFF]: 'bg-indigo-100 text-indigo-700',
  [ENUMS.Role.MEMBER]: 'bg-emerald-100 text-emerald-700',
};

export const Badge = ({ role }: Props) => (
  <span
    className={classNames(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      ROLE_STYLES[role],
    )}>
    {role}
  </span>
);
