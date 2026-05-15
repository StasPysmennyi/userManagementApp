import { API_URL } from '@env';
import { createUsersService } from '@uma/shared';

export const usersService = createUsersService(API_URL);
