import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontWeight: '500', color: COLORS.textBase },
  trigger: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  triggerError: { borderColor: COLORS.dangerLight },
  triggerText: { fontSize: 15, color: COLORS.textDark },
  placeholder: { color: COLORS.placeholder },
  error: { fontSize: 12, color: COLORS.danger },
});

export default styles;
