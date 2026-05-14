import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { queryClient } from 'src/api/queryClient';
import { router } from 'src/router';
import { store } from 'src/store';

export const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
