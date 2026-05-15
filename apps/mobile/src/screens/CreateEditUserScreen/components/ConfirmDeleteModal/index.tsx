import { Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Modal } from 'src/common';

import styles from './styles';

type Props = {
  visible: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  visible,
  isDeleting,
  onClose,
  onConfirm,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Modal visible={visible} onClose={onClose}>
      <View
        style={[styles.sheet, { paddingBottom: Math.max(20, bottom + 12) }]}>
        <Text style={styles.title}>Remove User</Text>
        <Text style={styles.text}>
          Are you sure you want to remove this user? This action cannot be
          undone.
        </Text>
        <View style={styles.actions}>
          <Button
            label="Cancel"
            variant="secondary"
            onPress={onClose}
            style={styles.btn}
          />
          <Button
            label="Remove"
            variant="danger"
            isLoading={isDeleting}
            onPress={onConfirm}
            style={styles.btn}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;
