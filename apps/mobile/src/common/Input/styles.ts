import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: '500', color: COLORS.textBase },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.textDark,
  },
  inputError: { borderColor: COLORS.dangerLight },
  error: { fontSize: 12, color: COLORS.danger },
});

export default styles;
