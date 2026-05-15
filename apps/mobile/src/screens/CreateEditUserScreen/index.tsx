import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { UserForm } from 'src/components';

import { ScreenHeader } from 'src/common';

import { useUserActions } from 'src/hooks';

import { COLORS } from 'src/constants';

import { ENUMS } from 'src/models';

import { type ScreenProps } from 'src/navigation';

import { ConfirmDeleteModal } from './components';
import styles from './styles';

type Props = ScreenProps<ENUMS.ScreenNames.CREATE_EDIT_USER>;

const CreateEditUserScreen = ({ route, navigation }: Props) => {
  const { userId } = route.params ?? {};
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const toggleConfirm = useCallback(() => setIsConfirmOpen(prev => !prev), []);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);
  const handleDeleteSuccess = useCallback(
    () => navigation.navigate(ENUMS.ScreenNames.USERS_LIST),
    [navigation],
  );

  const {
    user,
    isEditMode,
    isLoadingUser,
    isPending,
    isDeleting,
    handleSubmit,
    handleDelete,
  } = useUserActions(userId, {
    onSaveSuccess: handleGoBack,
    onDeleteSuccess: handleDeleteSuccess,
  });

  if (isEditMode && isLoadingUser) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={isEditMode ? 'Edit User' : 'Create User'}
        onBack={handleGoBack}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <UserForm
            user={user}
            isLoading={isPending}
            isDeleting={isDeleting}
            onSubmit={handleSubmit}
            onDelete={isEditMode ? toggleConfirm : undefined}
          />
        </View>
      </ScrollView>

      <ConfirmDeleteModal
        visible={isConfirmOpen}
        isDeleting={isDeleting}
        onClose={toggleConfirm}
        onConfirm={handleDelete}
      />
    </View>
  );
};

export default CreateEditUserScreen;
