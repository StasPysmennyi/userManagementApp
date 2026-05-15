import { useCallback } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';

import { ScreenHeader } from 'src/common';

import { setSearchQuery } from 'src/store/slices/usersSlice';

import { useAppDispatch, useAppSelector, useUsers } from 'src/hooks';

import { ENUMS, type TYPES } from 'src/models';

import { type ScreenProps } from 'src/navigation';

import { AddButton, ListEmpty, SearchBar, UserCard } from './components';
import styles from './styles';

type Props = ScreenProps<ENUMS.ScreenNames.USERS_LIST>;

const UsersListScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.users.searchQuery);
  const { data: users = [], isLoading } = useUsers();
  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearch = useCallback(
    (text: string) => dispatch(setSearchQuery(text)),
    [dispatch],
  );

  const handleNavigateToCreate = useCallback(
    () => navigation.navigate(ENUMS.ScreenNames.CREATE_EDIT_USER, {}),
    [navigation],
  );

  const handleNavigateToUser = useCallback(
    (userId: string) =>
      navigation.navigate(ENUMS.ScreenNames.CREATE_EDIT_USER, { userId }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: TYPES.User; index: number }) => (
      <UserCard
        user={item}
        index={index}
        onPress={handleNavigateToUser}
        onEdit={handleNavigateToUser}
      />
    ),
    [handleNavigateToUser],
  );

  const keyExtractor = useCallback((item: TYPES.User) => item.id, []);

  const headerRight = <AddButton onPress={handleNavigateToCreate} />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScreenHeader title="Users" right={headerRight} />

      <SearchBar value={search} onChangeText={handleSearch} />

      <FlatList
        data={isLoading ? [] : filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.list,
          !isLoading && filtered.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<ListEmpty isLoading={isLoading} search={search} />}
      />
    </KeyboardAvoidingView>
  );
};

export default UsersListScreen;
