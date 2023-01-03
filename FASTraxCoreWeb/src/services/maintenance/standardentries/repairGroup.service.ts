import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairGroup from '@app/entities/maintenance/standard-entries/RepairGroup';

export const KEY = generateUUID();

export const getRepairGroups = () => {
  return http.get<RepairGroup[]>(uri.maintenance.SE.repairGroups.all);
};

export const useRepairGroups = () => useQuery(KEY, getRepairGroups);
