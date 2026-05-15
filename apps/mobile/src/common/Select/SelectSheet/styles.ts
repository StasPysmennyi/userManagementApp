import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    gap: 4,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  option: { padding: 14, borderRadius: 10 },
  optionSelected: { backgroundColor: COLORS.primaryLight },
  optionText: { fontSize: 15, color: COLORS.textBase },
  optionTextSelected: { color: COLORS.primary, fontWeight: '600' },
});

export default styles;
