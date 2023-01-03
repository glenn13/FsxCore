import {useQuery} from 'react-query';
import {QUERY_KEY} from './constant';
import http from '../services/http.service';
import {getUsers} from './../services/user.service';
import {trackPromise} from 'react-promise-tracker';

export function useUser() {
  const getUser = async () => {
    const {data} = await http.get('/users');
    return data;
  };

  const result = useQuery(QUERY_KEY.USER, async () => trackPromise(getUser()));

  return {...result, users: result.data};
}

export const useUsers = () => useQuery(QUERY_KEY.USERS, getUsers);
