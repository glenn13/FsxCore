import {ProjectGroup} from '@app/entities/catalog';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useQuery} from 'react-query';
import {trackPromise} from 'react-promise-tracker';

enum API_KEY {
  PROJECT_GROUPS = 'PROJECT_GROUPS',
}

/******** API REQUEST ********/

export const getProjectGroups = async () => {
  return http.get<ProjectGroup[]>(uri.catalog.projects.SE.groups);
};
/******** QUERY HOOKS ********/

export const useProjectGroups = () => {
  const fetchprojectGroups = async () => {
    const {data} = await getProjectGroups();
    return data as Array<ProjectGroup>;
  };
  const result = useQuery(API_KEY.PROJECT_GROUPS, async () => trackPromise(fetchprojectGroups()));

  return {...result, projectGroups: result.data};
};
