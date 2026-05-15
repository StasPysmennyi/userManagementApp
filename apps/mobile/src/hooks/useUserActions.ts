import { type UserFormValues } from '@uma/shared';

import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
} from './useUsers';

type UseUserActionsCallbacks = {
  onSaveSuccess: () => void;
  onDeleteSuccess: () => void;
};

const useUserActions = (
  userId: string | undefined,
  { onSaveSuccess, onDeleteSuccess }: UseUserActionsCallbacks,
) => {
  const isEditMode = !!userId;

  const { data: user, isLoading: isLoadingUser } = useUser(userId ?? '');
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(
    userId ?? '',
  );
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleSubmit = (values: UserFormValues) => {
    const payload = {
      fullName: values.fullName,
      role: values.role,
      dateOfBirthday: values.dateOfBirthday || (isEditMode ? null : undefined),
    };

    if (isEditMode) {
      updateUser(payload, { onSuccess: onSaveSuccess });
    } else {
      createUser(payload, { onSuccess: onSaveSuccess });
    }
  };

  const handleDelete = () => {
    if (!userId) {
      return;
    }
    deleteUser(userId, { onSuccess: onDeleteSuccess });
  };

  return {
    user,
    isEditMode,
    isLoadingUser,
    isPending: isCreating || isUpdating,
    isDeleting,
    handleSubmit,
    handleDelete,
  };
};

export { useUserActions };
