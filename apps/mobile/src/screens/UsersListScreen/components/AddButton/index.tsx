import { Pressable } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Icons } from 'src/components';

import { COLORS } from 'src/constants';

import styles from './styles';

type Props = {
  onPress: () => void;
};

const AddButton = ({ onPress }: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.88, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Animated.View style={[styles.btn, animatedStyle]}>
        <Icons.PlusIcon width={20} height={20} fill={COLORS.primary} />
      </Animated.View>
    </Pressable>
  );
};

export default AddButton;
