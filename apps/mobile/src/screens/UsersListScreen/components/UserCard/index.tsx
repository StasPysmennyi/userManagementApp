import { Text, TouchableOpacity, View } from 'react-native';

import { formatDate } from '@uma/shared';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { Icons } from 'src/components';

import { Badge } from 'src/common';

import { ENUMS, type TYPES } from 'src/models';

import styles from './styles';

type Props = {
  user: TYPES.User;
  index: number;
  onPress: (userId: string) => void;
  onEdit: (userId: string) => void;
};

const UserCard = ({ user, index, onPress, onEdit }: Props) => {
  const handlePress = () => onPress(user.id);
  const handleEdit = () => onEdit(user.id);

  const enteringAnimation = FadeInDown.delay(index * 60);

  return (
    <Animated.View entering={enteringAnimation}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.name}>{user.fullName}</Text>

          <Badge role={user.role as ENUMS.Role} />

          <Text style={styles.date}>{formatDate(user.dateOfBirthday)}</Text>
        </View>

        <TouchableOpacity
          onPress={handleEdit}
          style={styles.actionBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icons.EditIcon width={18} height={18} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserCard;
