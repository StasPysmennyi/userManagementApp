import { Text, View } from 'react-native';

import Animated, { FadeIn } from 'react-native-reanimated';

const containerEntering = FadeIn.duration(300);

import { Icons } from 'src/components';

import styles from './styles';

type Props = {
  title: string;
  description?: string;
};

const EmptyState = ({ title, description }: Props) => (
  <Animated.View entering={containerEntering} style={styles.container}>
    <View style={styles.iconContainer}>
      <Icons.UserIcon width={32} height={32} />
    </View>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </Animated.View>
);

export default EmptyState;
