import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {UserStatus} from '@app/entities/catalog/UserStatus';

const PROJECT_STATUSES = 'PROJECT_STATUSES';
export const useProjectStatuses = () => {
  const result = useQuery(PROJECT_STATUSES, async () => {
    const {data} = await http.get(uri.catalog.projects.SE.statuses);
    return data as Array<UserStatus>;
  });

  return {...result, projectStatuses: result.data};
};
