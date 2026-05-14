import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type CreateUserDto, type UpdateUserDto } from '@uma/shared';

import { usersService } from 'src/api/services';
import { QUERY_KEYS } from 'src/constants';

export const useUsers = () =>
  useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: usersService.getAll,
  });

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
