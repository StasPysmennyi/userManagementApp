import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  baseText: { fontSize: 15, fontWeight: '600' },
  disabled: { opacity: 0.5 },
  primaryContainer: { backgroundColor: COLORS.primary },
  primaryText: { color: COLORS.white },
  secondaryContainer: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryText: { color: COLORS.textBase },
  dangerContainer: { backgroundColor: COLORS.danger },
  dangerText: { color: COLORS.white },
  ghostContainer: { backgroundColor: COLORS.transparent },
  ghostText: { color: COLORS.textDisabled },
});

export default styles;
