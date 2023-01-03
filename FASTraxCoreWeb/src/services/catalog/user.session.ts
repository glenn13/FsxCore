import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {UserLoginSession} from '@app/entities/catalog/UserLoginSession';

const USER_SESSION = 'USER_SESSION';
export const useUserSessions = () => {
  const result = useQuery(USER_SESSION, async () => {
    const {data} = await http.get(uri.catalog.users.sessions.all);
    return data as Array<UserLoginSession>;
  });

  return {...result, userSessions: result.data};
};
