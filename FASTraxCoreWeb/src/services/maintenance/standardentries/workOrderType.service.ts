import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import WorkOrderType from '@app/entities/maintenance/standard-entries/WorkOrderType';

const KEY = generateUUID();

export const getWorkOrderTypes = () => {
  return http.get<WorkOrderType[]>(uri.maintenance.SE.workordertypes.all);
};

export const useWorkOrderTypes = () => useQuery(KEY, getWorkOrderTypes);
