import { createBrowserRouter, Navigate } from 'react-router';

import { Layout } from 'src/components';
import { CreateEditUserPage } from 'src/pages/CreateEditUserPage';
import { UsersListPage } from 'src/pages/UsersListPage';

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <UsersListPage />
      </Layout>
    ),
    path: '/',
  },
  {
    element: (
      <Layout>
        <CreateEditUserPage />
      </Layout>
    ),
    path: '/users/new',
  },
  {
    element: (
      <Layout>
        <CreateEditUserPage />
      </Layout>
    ),
    path: '/users/:id/edit',
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
