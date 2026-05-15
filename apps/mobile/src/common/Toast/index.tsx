import { Text, View } from 'react-native';

import { type BaseToastProps } from 'react-native-toast-message';

import styles from './styles';

type Props = BaseToastProps & {
  text1: string;
  text2?: string;
  type: 'error' | 'success';
};

const Toast = ({ text1, text2, type }: Props) => (
  <View
    style={[
      styles.container,
      type === 'error' ? styles.errorAccent : styles.successAccent,
    ]}>
    <Text style={styles.text1}>{text1}</Text>
    {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
  </View>
);

export default Toast;
