import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import EstimationType from '../../../entities/maintenance/standard-entries/EstimationType';

export const KEY = generateUUID();

export const getEstimationTypes = () => {
  return http.get<EstimationType[]>(uri.maintenance.SE.estimationtypes.all);
};

export const useEstimationTypes = () => useQuery(KEY, getEstimationTypes);
