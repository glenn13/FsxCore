import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairLevel from '@app/entities/maintenance/standard-entries/RepairLevel';

export const KEY = generateUUID();

export const getRepairLevels = () => {
  return http.get<RepairLevel[]>(uri.maintenance.SE.repairLevels.all);
};

export const useRepairLevels = () => useQuery(KEY, getRepairLevels);
