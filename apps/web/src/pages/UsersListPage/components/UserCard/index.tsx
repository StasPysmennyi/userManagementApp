import { formatDate } from '@uma/shared';
import { motion } from 'motion/react';

import { Badge, Button, Icons } from 'src/components';

import { ENUMS, TYPES } from 'src/models';

const CARD_ANIMATION = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
} as const;

type Props = {
  user: TYPES.User;
  index: number;
  onEdit: () => void;
};

const UserCard = ({ user, index, onEdit }: Props) => (
  <motion.div
    className="rounded-xl border border-slate-200 bg-white p-4"
    {...CARD_ANIMATION}
    transition={{ delay: index * 0.05 }}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-slate-900">{user.fullName}</span>

        <Badge role={user.role as ENUMS.Role} />

        <span className="text-xs text-slate-500">
          {formatDate(user.dateOfBirthday)}
        </span>
      </div>
      <Button variant="ghost" size="sm" onClick={onEdit}>
        <Icons.EditIcon width={15} height={15} />
      </Button>
    </div>
  </motion.div>
);

export { UserCard };
