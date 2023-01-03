import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairSubGroup from '@app/entities/maintenance/standard-entries/RepairSubGroup';

export const KEY = generateUUID();

export const getRepairSubGroups = () => {
  return http.get<RepairSubGroup[]>(uri.maintenance.SE.repairSubGroups.all);
};

export const useRepairSubGroups = () => useQuery(KEY, getRepairSubGroups);
