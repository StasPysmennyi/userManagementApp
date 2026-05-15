import { TextInput, View } from 'react-native';

import { Icons } from 'src/components';

import { COLORS } from 'src/constants';

import styles from './styles';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText }: Props) => (
  <View style={styles.container}>
    <View style={styles.wrap}>
      <View style={styles.icon} pointerEvents="none">
        <Icons.SearchIcon width={16} height={16} />
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search users..."
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
      />
    </View>
  </View>
);

export default SearchBar;
