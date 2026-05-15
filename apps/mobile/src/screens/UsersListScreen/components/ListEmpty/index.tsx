import { ActivityIndicator } from 'react-native';

import { EmptyState } from 'src/components';

import { COLORS } from 'src/constants';

import styles from './styles';

type Props = {
  isLoading: boolean;
  isError: boolean;
  search: string;
};

const ListEmpty = ({ isLoading, isError, search }: Props) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={COLORS.primary}
      />
    );
  }

  if (isError) {
    return <EmptyState title="Something went wrong" />;
  }

  return (
    <EmptyState
      title={search ? 'No users found' : 'No users yet'}
      description={
        search ? 'Try a different name' : 'Tap + to create the first user'
      }
    />
  );
};

export default ListEmpty;
