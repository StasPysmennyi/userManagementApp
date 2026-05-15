import { formatDate } from '@uma/shared';
import { motion } from 'motion/react';

import { Badge, Button, Icons } from 'src/components';

import { ENUMS, TYPES } from 'src/models';

const ROW_ANIMATION = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
} as const;

type Props = {
  user: TYPES.User;
  index: number;
  onEdit: () => void;
};

const UserRow = ({ user, index, onEdit }: Props) => (
  <motion.tr
    className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/60"
    {...ROW_ANIMATION}
    transition={{ delay: index * 0.04 }}>
    <td className="px-5 py-4 text-sm font-medium text-slate-900">
      {user.fullName}
    </td>
    <td className="px-5 py-4">
      <Badge role={user.role as ENUMS.Role} />
    </td>
    <td className="px-5 py-4 text-sm text-slate-500">
      {formatDate(user.dateOfBirthday)}
    </td>
    <td className="px-5 py-4">
      <div className="flex items-center justify-end">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Icons.EditIcon width={15} height={15} />
        </Button>
      </div>
    </td>
  </motion.tr>
);

export { UserRow };
