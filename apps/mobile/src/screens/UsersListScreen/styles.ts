import { StyleSheet } from 'react-native';

import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 10 },
  emptyList: { flex: 1 },
});

export default styles;
