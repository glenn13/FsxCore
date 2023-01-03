import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairType from '@app/entities/maintenance/standard-entries/RepairType';

export const KEY = generateUUID();

export const getRepairTypes = () => {
  return http.get<RepairType[]>(uri.maintenance.SE.repairTypes.all);
};

export const useRepairTypes = () => useQuery(KEY, getRepairTypes);
