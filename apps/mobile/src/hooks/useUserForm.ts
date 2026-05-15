import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { userFormSchema, type UserFormValues } from '@uma/shared';
import { useForm } from 'react-hook-form';

import { type TYPES } from 'src/models';

type UseUserFormParams = {
  user?: TYPES.User;
};

const useUserForm = ({ user }: UseUserFormParams = {}) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: '',
      role: undefined,
      dateOfBirthday: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName,
        role: user.role,
        dateOfBirthday: user.dateOfBirthday ?? '',
      });
    }
  }, [user, reset]);

  return form;
};

export { useUserForm };
