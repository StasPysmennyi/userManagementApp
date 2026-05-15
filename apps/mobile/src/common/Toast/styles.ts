import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    paddingRight: 16,
    paddingLeft: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    minWidth: 300,
    maxWidth: 360,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    gap: 2,
  },
  errorAccent: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
  },
  successAccent: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  text1: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  text2: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});

export default styles;
