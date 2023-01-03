import {FsxUri} from '../../../helpers/endpoints';
import Status from '../../../entities/hr/standard-entries/Status';
import http from '../../http.service';
import {generateUUID} from '../../../helpers/randoms';
import {useQuery} from 'react-query';

export const KEY = generateUUID();

export const getStatus = () => {
  return http.get<Status[]>(FsxUri.hr.SE.status.all);
};

export const getDefaultHrStatus = () => {
  return http.get<Status>(FsxUri.hr.SE.status.default());
};

export const useStatus = () => useQuery(KEY, getStatus);