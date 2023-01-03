import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {UserStatus} from '@app/entities/catalog/UserStatus';

const USERSTATUSES = 'USER_STATUSES';
export const useUserStatuses = () => {
  const result = useQuery(USERSTATUSES, async () => {
    const {data} = await http.get(uri.catalog.users.statuses.all);
    return data as Array<UserStatus>;
  });

  return {...result, userStatuses: result.data};
};
