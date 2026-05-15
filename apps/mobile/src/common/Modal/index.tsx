import { type ReactNode } from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';

import styles from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'bottom' | 'center';
};

const Modal = ({ visible, onClose, children, position = 'bottom' }: Props) => (
  <RNModal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}>
    <TouchableOpacity
      style={position === 'center' ? styles.overlayCenter : styles.overlay}
      activeOpacity={1}
      onPress={onClose}>
      {children}
    </TouchableOpacity>
  </RNModal>
);

export default Modal;
