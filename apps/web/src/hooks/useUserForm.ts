import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userFormSchema, type UserFormValues } from '@uma/shared';

import { type TYPES } from 'src/models';

type UseUserFormParams = {
  defaultValues?: Partial<UserFormValues>;
  user?: TYPES.User;
};

export const useUserForm = ({ user }: UseUserFormParams = {}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      role: user?.role,
      dateOfBirthday: user?.dateOfBirthday ?? '',
    },
  });

  return form;
};
