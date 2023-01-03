import {FsxUri} from '../../../helpers/endpoints';
import MaritalStatus from '../../../entities/hr/standard-entries/MaritalStatus';
import http from '../../http.service';
import {generateUUID} from '../../../helpers/randoms';
import {useQuery} from 'react-query';

export const KEY = generateUUID();

export const getMaritalStatus = () => {
  return http.get<MaritalStatus[]>(FsxUri.hr.SE.maritalstatus.all);
};

export const getDefaultMaritalStatus = () => {
  return http.get<MaritalStatus>(FsxUri.hr.SE.maritalstatus.default());
};

export const useMaritalStatus = () => useQuery(KEY, getMaritalStatus);