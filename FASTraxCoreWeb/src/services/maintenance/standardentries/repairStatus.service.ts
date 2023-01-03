import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairStatus from '@app/entities/maintenance/standard-entries/RepairStatus';

export const KEY = generateUUID();

export const getRepairStatuses = () => {
  return http.get<RepairStatus[]>(uri.maintenance.SE.repairstatuses.all);
};

export const useRepairStatuses = () => useQuery(KEY, getRepairStatuses);
