import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import EstimationStatus from '@app/entities/maintenance/standard-entries/EstimationStatus';

const KEY = generateUUID();

export const getEstimationStatuses = () => {
  return http.get<EstimationStatus[]>(uri.maintenance.SE.estimationstatuses.all);
};

export const useEstimationStatuses = () => useQuery(KEY, getEstimationStatuses);
