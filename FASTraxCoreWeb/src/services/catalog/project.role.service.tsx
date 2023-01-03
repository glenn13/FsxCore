import {ProjectRole} from '@app/entities/catalog';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useQuery} from 'react-query';

enum API_KEY {
  ROLES_BYPROJECT = 'ROLES_BYPROJECT',
}

/******** API REQUEST ********/

export const getStaticProjectRoles = async () => {
  return http.get<ProjectRole[]>(uri.catalog.projectRoles.static);
};

export const getProjectRolesByProjectId = async (projectId: UrlParam) => {
  return http.get<ProjectRole[]>(uri.catalog.projectRoles.findByProjectId(projectId));
};

/******** QUERY HOOKS ********/

export const useRoleByProjectById = (id: UrlParam) => {
  const result = useQuery(API_KEY.ROLES_BYPROJECT, async () => {
    const {data} = await getProjectRolesByProjectId(id);
    return data as Array<ProjectRole>;
  });

  return {...result, projectRoles: result.data};
};
