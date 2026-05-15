import { type ChangeEvent } from 'react';

import { useNavigate } from 'react-router';

import { Button, Icons } from 'src/components';

import { setSearchQuery } from 'src/store/slices/usersSlice';

import { useAppDispatch, useAppSelector, useUsers } from 'src/hooks';

import { ROUTES } from 'src/constants';

import { SearchBar, UsersContent } from './components';

export const UsersListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.users.searchQuery);
  const { data: users, isLoading, isError } = useUsers();

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchQuery(e.target.value));

  const handleEdit = (id: string) => navigate(ROUTES.userEdit(id));

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
          onClick={() => navigate(ROUTES.usersNew)}
          className="w-full sm:w-auto">
          <Icons.PlusIcon width={16} height={16} />
          Add User
        </Button>
      </div>

      <SearchBar value={search} onChange={handleSearch} />

      <UsersContent
        isLoading={isLoading}
        search={search}
        users={filtered}
        onEdit={handleEdit}
      />
    </div>
  );
};
