import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';

import { formatDate } from '@uma/shared';

import { ENUMS, TYPES } from 'src/models';
import { useDeleteUser, useUsers } from 'src/hooks';
import {
  Badge,
  Button,
  EmptyState,
  Icons,
  Modal,
  UserForm,
} from 'src/components';

export const UsersListPage = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteConfirm = (id: string) => {
    deleteUser(id, { onSuccess: () => setDeletingId(null) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500">{users.length} total</p>
        </div>
        <Button
          onClick={() => navigate('/users/new')}
          className="w-full sm:w-auto">
          <Icons.PlusIcon width={16} height={16} />
          Add User
        </Button>
      </div>

      <div className="relative">
        <Icons.SearchIcon
          width={16}
          height={16}
          fill="#94a3b8"
          // @ts-expect-error inline style for positioning only
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title={search ? 'No users found' : 'No users yet'}
          description={
            search
              ? 'Try a different search term'
              : 'Create your first user to get started'
          }
        />
      ) : (
        <>
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
                  {filtered.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}>
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
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/users/${user.id}/edit`)}>
                            <Icons.EditIcon width={15} height={15} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletingId(user.id)}
                            className="text-red-500 hover:bg-red-50">
                            <Icons.TrashIcon width={15} height={15} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            <AnimatePresence>
              {filtered.map((user: TYPES.User, i) => (
                <motion.div
                  key={user.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-slate-900">
                        {user.fullName}
                      </span>
                      <Badge role={user.role as ENUMS.Role} />
                      <span className="text-xs text-slate-500">
                        {formatDate(user.dateOfBirthday)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/users/${user.id}/edit`)}>
                        <Icons.EditIcon width={15} height={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingId(user.id)}
                        className="text-red-500 hover:bg-red-50">
                        <Icons.TrashIcon width={15} height={15} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Remove User">
        <p className="mb-5 text-sm text-slate-600">
          Are you sure you want to remove this user? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeletingId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            isLoading={isDeleting}
            onClick={() => deletingId && handleDeleteConfirm(deletingId)}>
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};
