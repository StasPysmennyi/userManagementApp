import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';

import { COLORS } from 'src/constants';

import { TYPES } from 'src/models';

import { VARIANT_STYLES_CONFIG } from './config';
import styles from './styles';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: TYPES.Variant;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

const Button = ({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
}: Props) => {
  const { container, text } = VARIANT_STYLES_CONFIG[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.75}
      style={[
        styles.base,
        container,
        (disabled || isLoading) && styles.disabled,
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? COLORS.white : COLORS.primary}
        />
      ) : (
        <Text style={[styles.baseText, text]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
