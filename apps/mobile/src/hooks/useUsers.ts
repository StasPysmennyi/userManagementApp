import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  type CreateUserDto,
  type UpdateUserDto,
  type UserFormValues,
} from '@uma/shared';
import Toast from 'react-native-toast-message';

import { usersService } from 'src/api/services';

import { QUERY_KEYS } from 'src/constants';

const showError = (message: string) =>
  Toast.show({ type: 'error', text1: 'Something went wrong', text2: message });

const showSuccess = (message: string) =>
  Toast.show({ type: 'success', text1: message });

const useUsers = () =>
  useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: usersService.getAll,
  });

const useUser = (id: string) =>
  useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => usersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
      showSuccess('User created');
    },
    onError: () => showError('Failed to create user'),
  });
};

const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => usersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user(id) });
      showSuccess('Changes saved');
    },
    onError: () => showError('Failed to save changes'),
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
      showSuccess('User removed');
    },
    onError: () => showError('Failed to delete user'),
  });
};

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

export {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
  useUserActions,
  useUsers,
};
