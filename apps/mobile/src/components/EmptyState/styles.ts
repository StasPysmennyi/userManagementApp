import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 60 },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  description: { fontSize: 14, color: COLORS.placeholder, textAlign: 'center' },
});

export default styles;
