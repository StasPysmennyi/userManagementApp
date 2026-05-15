import { AnimatePresence } from 'motion/react';

import { TYPES } from 'src/models';

import { UserRow } from '../UserRow';

type Props = {
  users: TYPES.User[];
  onEdit: (id: string) => void;
};

const UsersTable = ({ users, onEdit }: Props) => (
  <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-100 bg-slate-50">
          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Name
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Role
          </th>
          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            Birthday
          </th>
          <th className="px-5 py-3" />
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {users.map((user, i) => (
            <UserRow
              key={user.id}
              user={user}
              index={i}
              onEdit={() => onEdit(user.id)}
            />
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  </div>
);

export { UsersTable };
