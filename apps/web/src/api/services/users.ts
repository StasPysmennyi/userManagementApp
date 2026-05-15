import { createUsersService } from '@uma/shared';

export const usersService = createUsersService(
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
);
