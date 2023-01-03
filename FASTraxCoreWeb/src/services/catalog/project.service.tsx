import {AxiosResponse} from 'axios';
import {Project} from '@app/entities/catalog';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useQuery} from 'react-query';

export enum API_KEY {
  PROJECTS = 'PROJECTS',
  PROJECT = 'PROJECT',
  PROJECT_SITES = 'PROJECT_SITES',
}

/******** API REQUEST ********/

export const getAllProjects = async () => {
  return http.get<Array<Project>>(uri.catalog.projects.all);
};

export const getProjectById = async (id: UrlParam) => {
  return http.get<Project>(uri.catalog.projects.find(id));
};

export const postProject = (payload: Project): Promise<AxiosResponse<Project>> => {
  return http.post(uri.catalog.projects.all, payload);
};

export const patchProject = (payload: Project): Promise<AxiosResponse<Project>> => {
  if (!payload.id) return Promise.reject('ID is missing!');

  return http.patch(uri.catalog.projects.updateProject(payload.id), payload);
};

const getAllProjectSites = async () => {
  const {data} = await http.get(uri.catalog.projects.sites.all);
  return data;
};

export const useProjectsByUser = (userId: number) => {
  if (userId <= 0) throw 'userId must be greater than 0';

  const result = useQuery('PROJECTS_BY_USER', async () => {
    const {data} = await http.get(uri.catalog.projects.findProjectsByUserId(userId));
    return data as Project[];
  });

  return result;
};

/******** QUERY HOOKS ********/

export const useProjects = () => useQuery(API_KEY.PROJECTS, getAllProjects);
export const useProject = (id: number) => useQuery(API_KEY.PROJECT, async () => getProjectById(id));
export const useProjectSites = () => useQuery(API_KEY.PROJECT_SITES, getAllProjectSites);
