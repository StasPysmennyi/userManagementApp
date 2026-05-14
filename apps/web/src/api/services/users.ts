import { usersService as service } from '@uma/shared';

export const usersService = service(
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
);
