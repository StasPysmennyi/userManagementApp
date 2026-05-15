import { AnimatePresence } from 'motion/react';

import { TYPES } from 'src/models';

import { UserCard } from '../UserCard';

type Props = {
  users: TYPES.User[];
  onEdit: (id: string) => void;
};

const UsersCards = ({ users, onEdit }: Props) => (
  <div className="flex flex-col gap-3 md:hidden">
    <AnimatePresence>
      {users.map((user, i) => (
        <UserCard
          key={user.id}
          user={user}
          index={i}
          onEdit={() => onEdit(user.id)}
        />
      ))}
    </AnimatePresence>
  </div>
);

export { UsersCards };
