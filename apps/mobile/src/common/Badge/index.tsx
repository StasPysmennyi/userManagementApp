import { Text, View } from 'react-native';

import { ENUMS } from 'src/models';

import { ROLE_STYLES } from './config';
import styles from './styles';

type Props = {
  role: ENUMS.Role;
};

const Badge = ({ role }: Props) => {
  const { container, text } = ROLE_STYLES[role];
  return (
    <View style={[styles.base, container]}>
      <Text style={[styles.baseText, text]}>{role}</Text>
    </View>
  );
};

export default Badge;
