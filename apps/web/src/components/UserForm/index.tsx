import { Controller } from 'react-hook-form';
import { type UserFormValues } from '@uma/shared';

import { type TYPES } from 'src/models';
import { useUserForm } from 'src/hooks';
import { ROLE_OPTIONS } from 'src/constants';
import { Button, DatePicker, Input, Select } from 'src/components/ui';

type Props = {
  user?: TYPES.User;
  isLoading?: boolean;
  onSubmit: (values: UserFormValues) => void;
  onDelete?: () => void;
  isDeleting?: boolean;
};

export const UserForm = ({
  user,
  isLoading,
  onSubmit,
  onDelete,
  isDeleting,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useUserForm({ user });

  const isEditMode = !!user;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Full Name"
        placeholder="Enter full name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            label="Role"
            placeholder="Select role"
            options={ROLE_OPTIONS}
            error={errors.role?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="dateOfBirthday"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            label="Date of Birthday (optional)"
            value={value ?? ''}
            onChange={onChange}
            error={errors.dateOfBirthday?.message}
          />
        )}
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {isEditMode && onDelete ? (
          <Button
            type="button"
            variant="danger"
            isLoading={isDeleting}
            onClick={onDelete}>
            Remove User
          </Button>
        ) : null}
        <Button type="submit" isLoading={isLoading} className="sm:ml-auto">
          {isEditMode ? 'Save Changes' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};
