import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import FailureCause from '../../../entities/maintenance/standard-entries/FailureCause';

export const KEY = generateUUID();

export const getFailureCauses = () => {
  return http.get<FailureCause[]>(uri.maintenance.SE.failureCauses.all);
};

export const useFailureCauses = () => useQuery(KEY, getFailureCauses);
