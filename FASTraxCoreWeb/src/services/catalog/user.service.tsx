import {AxiosResponse} from 'axios';
import http from '@app/services/http.service';
import {ChangePassword, IUserFormData, User} from '@app/entities/catalog';
import uri from '@app/helpers/endpoints';
import {UserProjectSiteRole} from '@app/entities/catalog/UserProjectSiteRole';

export const postUser = (payload: IUserFormData): Promise<AxiosResponse<User>> => {
  return http.post(uri.catalog.users.all, payload);
};

export const patchUser = (payload: IUserFormData): Promise<AxiosResponse<User>> => {
  if (!payload.id) return Promise.reject('ID is missing!');

  return http.patch(uri.catalog.users.updateUser(payload.id), payload);
};

export const postChangePassword = (payload: ChangePassword): Promise<AxiosResponse<User>> => {
  if (!payload.userId) return Promise.reject('User ID is missing!');

  return http.post(uri.catalog.users.changePassword, payload);
};

export const getUserById = async (id: UrlParam) => {
  return http.get<User>(uri.catalog.users.find(id));
};

export const getAllProjectSites = async () => {
  return http.get<UserProjectSiteRole[]>(uri.catalog.projectSites.base);
};
