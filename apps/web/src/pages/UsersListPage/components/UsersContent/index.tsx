import { EmptyState, Spinner } from 'src/components';

import { TYPES } from 'src/models';

import { UsersCards } from '../UsersCards';
import { UsersTable } from '../UsersTable';

type Props = {
  isLoading: boolean;
  search: string;
  users: TYPES.User[];
  onEdit: (id: string) => void;
};

const UsersContent = ({ isLoading, search, users, onEdit }: Props) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (users.length === 0) {
    return (
      <EmptyState
        title={search ? 'No users found' : 'No users yet'}
        description={
          search
            ? 'Try a different search term'
            : 'Create your first user to get started'
        }
      />
    );
  }

  // Both render simultaneously — CSS toggles visibility:
  // UsersTable: hidden on mobile, visible md+
  // UsersCards: visible on mobile, hidden md+
  return (
    <>
      <UsersTable users={users} onEdit={onEdit} />
      <UsersCards users={users} onEdit={onEdit} />
    </>
  );
};

export { UsersContent };
