import { createBrowserRouter, Navigate } from 'react-router';

import { Layout } from 'src/components';

import { CreateEditUserPage } from 'src/pages/CreateEditUserPage';
import { UsersListPage } from 'src/pages/UsersListPage';

import { ROUTES } from 'src/constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: (
      <Layout>
        <UsersListPage />
      </Layout>
    ),
  },
  {
    path: ROUTES.usersNew,
    element: (
      <Layout>
        <CreateEditUserPage />
      </Layout>
    ),
  },
  {
    path: ROUTES.userEditPattern,
    element: (
      <Layout>
        <CreateEditUserPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.home} replace />,
  },
]);
