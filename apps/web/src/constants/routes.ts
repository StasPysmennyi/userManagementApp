export const ROUTES = {
  home: '/',
  usersNew: '/users/new',
  userEdit: (id: string) => `/users/${id}/edit`,
  userEditPattern: '/users/:id/edit',
} as const;
