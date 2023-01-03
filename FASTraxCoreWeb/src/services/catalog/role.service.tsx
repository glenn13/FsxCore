import {AxiosResponse} from 'axios';
import {Role} from '@app/entities/catalog';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export enum API_KEY {
  ROLES = 'ROLES',
  ROLE = 'ROLE',
}

/******** API REQUEST ********/

export const getAllRoles = async () => {
  return http.get<Array<Role>>(`roles`);
};

export const getRoleById = async (id: number) => {
  return http.get<Role>(`roles/${id}`);
};

export const postRole = (payload: Role): Promise<AxiosResponse<Role>> => {
  return http.post(`roles`, payload);
};

export const patchRole = (payload: Role): Promise<AxiosResponse<Role>> => {
  if (!payload.id) return Promise.reject('ID is missing!');

  return http.patch(`roles/${payload.id}`, payload);
};

/******** QUERY HOOKS ********/

export const useRoles = () => useQuery(API_KEY.ROLES, getAllRoles);
export const useRole = (id: number) => useQuery(API_KEY.ROLE, async () => getRoleById(id));
