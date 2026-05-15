import { type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';

import { formatDate } from '@uma/shared';

import { ENUMS, TYPES } from 'src/models';
import { useAppDispatch, useAppSelector, useUsers } from 'src/hooks';
import { setSearchQuery } from 'src/store/slices/usersSlice';
import { Badge, Button, EmptyState, Icons } from 'src/components';

export const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.users.searchQuery);
  const { data: users, isLoading, isError } = useUsers();

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-base font-semibold text-red-500">
          Could not connect to API
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Make sure the API is running on http://localhost:3001
        </p>
      </div>
    );
  }

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
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <Icons.SearchIcon width={16} height={16} fill="#94a3b8" />
        </span>
        <input
          value={search}
          onChange={handleSearch}
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
                        <div className="flex items-center justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/users/${user.id}/edit`)}>
                            <Icons.EditIcon width={15} height={15} />
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/users/${user.id}/edit`)}>
                      <Icons.EditIcon width={15} height={15} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};
