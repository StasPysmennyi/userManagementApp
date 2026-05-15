import { View } from 'react-native';

import { type UserFormValues } from '@uma/shared';
import { Controller } from 'react-hook-form';

import { Button, DatePicker, Input, Select } from 'src/common';

import { useUserForm } from 'src/hooks';

import { ROLE_OPTIONS } from 'src/constants';

import { type TYPES } from 'src/models';

import styles from './styles';

type Props = {
  user?: TYPES.User;
  isLoading?: boolean;
  isDeleting?: boolean;
  onSubmit: (values: UserFormValues) => void;
  onDelete?: () => void;
};

const UserForm = ({
  user,
  isLoading,
  isDeleting,
  onSubmit,
  onDelete,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useUserForm({ user });

  const isEditMode = !!user;

  return (
    <View style={styles.container}>
      <Controller
        name="fullName"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Full Name"
            placeholder="Enter full name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.fullName?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            label="Role"
            placeholder="Select role"
            value={value}
            options={ROLE_OPTIONS}
            error={errors.role?.message}
            onChange={onChange}
          />
        )}
      />

      <Controller
        name="dateOfBirthday"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label="Date of Birthday (optional)"
            value={value ?? ''}
            error={errors.dateOfBirthday?.message}
            onChange={onChange}
            onClear={() => onChange('')}
          />
        )}
      />

      <View style={styles.actions}>
        <Button
          label={isEditMode ? 'Save Changes' : 'Create User'}
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
        {isEditMode && onDelete && (
          <Button
            label="Remove User"
            variant="danger"
            onPress={onDelete}
            isLoading={isDeleting}
          />
        )}
      </View>
    </View>
  );
};

export default UserForm;
