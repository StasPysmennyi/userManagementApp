import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  baseText: { fontSize: 12, fontWeight: '600' },
  staffContainer: { backgroundColor: COLORS.primaryLight },
  staffText: { color: COLORS.primary },
  memberContainer: { backgroundColor: COLORS.successLight },
  memberText: { color: COLORS.success },
});

export default styles;
