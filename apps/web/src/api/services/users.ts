import axios from 'axios';
import { type CreateUserDto, type UpdateUserDto, type User } from '@uma/shared';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
});

export const usersService = {
  getAll: () => api.get<User[]>('/api/users').then(r => r.data),
  getById: (id: string) => api.get<User>(`/api/users/${id}`).then(r => r.data),
  create: (data: CreateUserDto) =>
    api.post<User>('/api/users', data).then(r => r.data),
  update: (id: string, data: UpdateUserDto) =>
    api.put<User>(`/api/users/${id}`, data).then(r => r.data),
  remove: (id: string) => api.delete(`/api/users/${id}`),
};
