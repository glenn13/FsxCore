import http, {getJwtHeaderAuth} from '../http.service';

import {Project} from '@app/entities/catalog';
import authService from '../auth.service';
import jwt from 'jsonwebtoken';
import uri from '@app/helpers/endpoints';
import {useQuery} from 'react-query';

const KEYS = {
  SESSION: {
    CURRENT_PROJECT: 'CURRENT_PROJECT',
  },
  LOCAL: {
    CURRENT_PROJECT: 'CURRENT_PROJECT',
  },
};

export enum PROJECT_API_KEY {
  PROJECT = 'PROJECT',
  PROJECT_SITES = 'PROJECT_SITES',
}

export interface ITokenClaims {
  userProjects: string;
  projectIds: string;
}

interface IResponseResult<T> {
  data: T;
}

export const getProjects = async (): Promise<Project[]> => {
  const {jwtToken} = authService.currentUser.value;
  const {userProjects} = jwt.decode(jwtToken) as ITokenClaims;

  return Promise.resolve(JSON.parse(userProjects || '{}'));
};

export const getProjectById = async (id: number): Promise<IResponseResult<Project>> => {
  return await http.get(`/projects/${id}`, {headers: getJwtHeaderAuth()});
};

export const getProject = (id: number, forProjectSelection: boolean = false) => {
  return http.get<Project>(uri.catalog.projects.find(id, forProjectSelection));
};

const removeLocalCurrentProject = (): void => localStorage.removeItem(KEYS.LOCAL.CURRENT_PROJECT);

const setLocalCurrentProject = (project: Project): void =>
  localStorage.setItem(KEYS.LOCAL.CURRENT_PROJECT, JSON.stringify(project));

const getLocalCurrentProject = (): Project | null => {
  const storedValue = localStorage.getItem(KEYS.LOCAL.CURRENT_PROJECT);

  if (!storedValue) return null;

  const typedValue: Project = JSON.parse(storedValue);

  return typedValue;
};

const removeSessionCurrentProject = (): void =>
  sessionStorage.removeItem(KEYS.LOCAL.CURRENT_PROJECT);

const setSessionCurrentProject = (project: Project): void =>
  sessionStorage.setItem(KEYS.LOCAL.CURRENT_PROJECT, JSON.stringify(project));

const getSessionCurrentProject = (): Project | null => {
  const storedValue = sessionStorage.getItem(KEYS.LOCAL.CURRENT_PROJECT);

  if (!storedValue) return null;

  const typedValue: Project = JSON.parse(storedValue);

  return typedValue;
};

const Session = {
  currentProject: {
    remove: removeSessionCurrentProject,
    set: setSessionCurrentProject,
    get: getSessionCurrentProject,
  },
};

const Local = {
  currentProject: {
    remove: removeLocalCurrentProject,
    set: setLocalCurrentProject,
    get: getLocalCurrentProject,
  },
};

const fetchProjects = async () => {
  const {data} = await http.get(`http://localhost:4444/projects`);
  return data;
};

export const useProjects = () => useQuery(PROJECT_API_KEY.PROJECT_SITES, fetchProjects);

const fetchProjectSites = async () => {
  const {data} = await http.get(uri.catalog.projects.sites.all);
  return data;
};

export const useProjectSites = () => useQuery(PROJECT_API_KEY.PROJECT_SITES, fetchProjectSites);

export const postProject = (payload: any) => {
  return http.post('/projects', payload);
};

export default {
  Session,
  Local,
};
