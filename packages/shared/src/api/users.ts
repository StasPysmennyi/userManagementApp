import axios from 'axios';

import {
  type CreateUserDto,
  type UpdateUserDto,
  type User,
} from '../models/types';

const usersService = (baseURL: string) => {
  const api = axios.create({ baseURL });

  const getAll = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/users');
    return response.data;
  };

  const getById = async (id: string): Promise<User> => {
    const response = await api.get<User>(`/api/users/${id}`);
    return response.data;
  };

  const create = async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<User>('/api/users', data);
    return response.data;
  };

  const update = async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await api.put<User>(`/api/users/${id}`, data);
    return response.data;
  };

  const remove = async (id: string): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  };

  return { getAll, getById, create, update, remove };
};

export { usersService };
