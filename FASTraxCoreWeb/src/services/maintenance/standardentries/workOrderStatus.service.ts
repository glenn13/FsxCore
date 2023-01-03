import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import WorkOrderStatus from '@app/entities/maintenance/standard-entries/WorkOrderStatus';

const KEY = generateUUID();

export const getWorkOrderStatuses = () => {
  return http.get<WorkOrderStatus[]>(uri.maintenance.SE.workorderstatuses.all);
};

export const useWorkOrderStatuses = () => useQuery(KEY, getWorkOrderStatuses);
