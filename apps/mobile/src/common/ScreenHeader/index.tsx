import { type ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icons } from 'src/components';

import styles from './styles';

type Props = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
};

const ScreenHeader = ({ title, onBack, right }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.side}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.backBtn}>
            <Icons.BackIcon width={22} height={22} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightSide}>{right ?? null}</View>
    </View>
  );
};

export default ScreenHeader;
