import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormValues } from '@uma/shared';
import { useForm } from 'react-hook-form';

import { type TYPES } from 'src/models';

type UseUserFormParams = {
  user?: TYPES.User;
};

export const useUserForm = ({ user }: UseUserFormParams = {}) => {
  return useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      role: user?.role,
      dateOfBirthday: user?.dateOfBirthday ?? '',
    },
  });
};
