import { StatusBar } from 'react-native';

import { QueryClientProvider } from '@tanstack/react-query';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import RNToast, { type ToastConfig } from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { Toast } from 'src/common';

import { store } from 'src/store';

import { queryClient } from 'src/api/queryClient';

import { COLORS } from 'src/constants';

import Navigation from 'src/navigation';

const toastConfig: ToastConfig = {
  error: ({ text1, text2 }) => (
    <Toast type="error" text1={text1 ?? ''} text2={text2} />
  ),
  success: ({ text1, text2 }) => (
    <Toast type="success" text1={text1 ?? ''} text2={text2} />
  ),
};

const ToastManager = () => {
  const { top } = useSafeAreaInsets();
  return <RNToast config={toastConfig} topOffset={top} />;
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Navigation />
        <ToastManager />
      </SafeAreaProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
