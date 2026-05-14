import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type CreateUserDto, type UpdateUserDto, type User } from '@uma/shared';

import { usersService } from 'src/api/services';
import { QUERY_KEYS } from 'src/constants';

export const useUsers = () => {
  const query = useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: usersService.getAll,
  });

  return {
    ...query,
    data: Array.isArray(query.data) ? query.data : ([] as User[]),
  };
};

export const useUser = (id: string) =>
  useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => usersService.getById(id),
    enabled: !!id,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => usersService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users }),
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => usersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user(id) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users }),
  });
};
