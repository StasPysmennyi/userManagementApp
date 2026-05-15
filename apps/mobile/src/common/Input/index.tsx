import { forwardRef } from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';

import { COLORS } from 'src/constants';

import styles from './styles';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

const Input = forwardRef<TextInput, Props>(
  ({ label, error, style, ...props }, ref) => (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref}
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={COLORS.placeholder}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  ),
);

Input.displayName = 'Input';

export default Input;
