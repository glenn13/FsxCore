import {AxiosResponse} from 'axios';
import FsxUri from '../helpers/endpoints';
import {User} from '../entities/catalog/User';
import {Users} from '../helpers/api.endpoints';
import http from './http.service';
import {useQuery} from 'react-query';

const KEYS = {
  SESSION: {
    CURRENT_USER: 'CURRENT_USER',
  },
  LOCAL: {
    CURRENT_USER: 'CURRENT_USER',
  },
};

export const getUsers = (): Promise<AxiosResponse<User[]>> => {
  return http.get(FsxUri.catalog.users.all);
};

export const getByUserId = (id: number) => {
  return Users.getByUserId(id);
};

export const getUserProjects = (id: number) => {
  return Users.getUserProjects(id);
};

export const getProjectsByUser = (userId: number) => {
  return Users.getProjectsByUser(userId);
};

const getLocalCurrentUser = (): User | null => {
  const storedValue = localStorage.getItem(KEYS.LOCAL.CURRENT_USER);

  if (!storedValue) return null;

  const typedValue: User = JSON.parse(storedValue);

  return typedValue;
};

const setLocalCurrentUser = (user: User): void =>
  localStorage.setItem(KEYS.LOCAL.CURRENT_USER, JSON.stringify(user));

const removeLocalCurrentUser = (): void => localStorage.removeItem(KEYS.LOCAL.CURRENT_USER);

export enum USER_API_KEY {
  USER_PROJECTSITES = 'USER_PROJECTSITES',
}

const fetchProjectSitesByUser = async (userId: number) => {
  const {data} = await http.get(FsxUri.catalog.users.projects.findSitesByUserId(userId));
  return data;
};

export const useProjectSitesByUser = (userId: number) =>
  useQuery(USER_API_KEY.USER_PROJECTSITES, async () => await fetchProjectSitesByUser(userId));

const Local = {
  currentUser: {
    get: getLocalCurrentUser,
    set: setLocalCurrentUser,
    remove: removeLocalCurrentUser,
  },
};

export default {
  getByUserId,
  getUserProjects,
  Local,
};
