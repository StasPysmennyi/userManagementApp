import { API_URL } from '@env';
import { usersService as service } from '@uma/shared';

export const usersService = service(API_URL);
