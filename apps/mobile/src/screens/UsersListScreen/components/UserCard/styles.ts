import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  content: { flex: 1, gap: 6 },
  name: { fontSize: 15, fontWeight: '600', color: COLORS.textDark },
  date: { fontSize: 13, color: COLORS.placeholder },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: { padding: 6 },
});

export default styles;
