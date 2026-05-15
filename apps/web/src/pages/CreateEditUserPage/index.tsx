import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { type UserFormValues } from '@uma/shared';

import {
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUser,
} from 'src/hooks';
import { Button, Modal, UserForm } from 'src/components';

export const CreateEditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useUser(id ?? '');
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser(id ?? '');
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleSubmit = (values: UserFormValues) => {
    const payload = {
      fullName: values.fullName,
      role: values.role,
      dateOfBirthday: values.dateOfBirthday || (isEditMode ? null : undefined),
    };

    if (isEditMode) {
      updateUser(payload, { onSuccess: () => navigate('/') });
    } else {
      createUser(payload, { onSuccess: () => navigate('/') });
    }
  };

  const handleDeleteConfirm = () => {
    if (!id) {
      return;
    }
    deleteUser(id, { onSuccess: () => navigate('/') });
  };

  if (isEditMode && isLoadingUser) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {isEditMode ? 'Edit User' : 'Create User'}
        </h1>
        <p className="text-sm text-slate-500">
          {isEditMode
            ? 'Update user information'
            : 'Fill in the details to create a new user'}
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <UserForm
          user={user}
          isLoading={isCreating || isUpdating}
          onSubmit={handleSubmit}
          onDelete={
            isEditMode ? () => setIsConfirmOpen(prev => !prev) : undefined
          }
          isDeleting={isDeleting}
        />
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(prev => !prev)}
        title="Remove User">
        <p className="mb-5 text-sm text-slate-600">
          Are you sure you want to remove this user? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsConfirmOpen(prev => !prev)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            isLoading={isDeleting}
            onClick={handleDeleteConfirm}>
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};
