export const QUERY_KEYS = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
};
