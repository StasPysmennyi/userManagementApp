import { type ComponentType } from 'react';

import { CreateEditUserScreen, UsersListScreen } from 'src/screens';

import { ENUMS } from 'src/models';

import { type RootStackParamList } from './types';

type ScreenConfig = {
  name: keyof RootStackParamList;
  component: ComponentType<any>;
};

const SCREENS: ScreenConfig[] = [
  {
    name: ENUMS.ScreenNames.USERS_LIST,
    component: UsersListScreen,
  },
  {
    name: ENUMS.ScreenNames.CREATE_EDIT_USER,
    component: CreateEditUserScreen,
  },
];

export { SCREENS };
