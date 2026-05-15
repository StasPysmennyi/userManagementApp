import axios from 'axios';

import {
  type CreateUserDto,
  type UpdateUserDto,
  type User,
} from '../models/types';

const createUsersService = (baseURL: string) => {
  const api = axios.create({ baseURL });

  const getAll = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/api/users');
    return data;
  };

  const getById = async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/api/users/${id}`);
    return data;
  };

  const create = async (dto: CreateUserDto): Promise<User> => {
    const { data } = await api.post<User>('/api/users', dto);
    return data;
  };

  const update = async (id: string, dto: UpdateUserDto): Promise<User> => {
    const { data } = await api.put<User>(`/api/users/${id}`, dto);
    return data;
  };

  const remove = async (id: string): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  };

  return { getAll, getById, create, update, remove };
};

export { createUsersService };
