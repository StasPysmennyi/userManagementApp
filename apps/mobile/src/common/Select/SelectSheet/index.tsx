import { Text, TouchableOpacity } from 'react-native';

import Animated, { FadeIn } from 'react-native-reanimated';

import { TYPES } from 'src/models';

import styles from './styles';

type Props = {
  label?: string;
  value?: string;
  options: readonly TYPES.Option[];
  onSelect: (value: string) => void;
};

const SelectSheet = ({ label, value, options, onSelect }: Props) => (
  <Animated.View entering={FadeIn} style={styles.sheet}>
    {label && <Text style={styles.sheetTitle}>{label}</Text>}

    {options.map(opt => (
      <TouchableOpacity
        key={opt.value}
        onPress={() => onSelect(opt.value)}
        activeOpacity={0.7}
        style={[styles.option, opt.value === value && styles.optionSelected]}>
        <Text
          style={[
            styles.optionText,
            opt.value === value && styles.optionTextSelected,
          ]}>
          {opt.label}
        </Text>
      </TouchableOpacity>
    ))}
  </Animated.View>
);

export default SelectSheet;
