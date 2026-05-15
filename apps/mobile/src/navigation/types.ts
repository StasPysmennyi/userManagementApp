import { type RouteProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ENUMS } from 'src/models';

export type RootStackParamList = {
  [ENUMS.ScreenNames.USERS_LIST]: undefined;
  [ENUMS.ScreenNames.CREATE_EDIT_USER]: { userId?: string };
};

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
