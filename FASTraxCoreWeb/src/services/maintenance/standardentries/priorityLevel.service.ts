import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import PriorityLevel from '@app/entities/maintenance/standard-entries/PriorityLevel';

export const KEY = generateUUID();

export const getPriorityLevels = () => {
  return http.get<PriorityLevel[]>(uri.maintenance.SE.prioritylevels.all);
};

export const usePriorityLevels = () => useQuery(KEY, getPriorityLevels);
