import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from 'src/constants';

import { SCREENS } from './screens';
import { type RootStackParamList, type ScreenProps } from './types';

export type { RootStackParamList, ScreenProps };

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}>
      {SCREENS.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
