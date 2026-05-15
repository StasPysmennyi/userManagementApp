import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type CreateUserDto, type UpdateUserDto } from '@uma/shared';
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
      showSuccess('User created');
    },
    onError: () => showError('Failed to create user'),
  });
};

const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => usersService.update(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user(id) }),
      ]);
      showSuccess('Changes saved');
    },
    onError: () => showError('Failed to save changes'),
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
      showSuccess('User removed');
    },
    onError: () => showError('Failed to delete user'),
  });
};

export { useCreateUser, useDeleteUser, useUpdateUser, useUser, useUsers };
