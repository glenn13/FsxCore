import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairAction from '@app/entities/maintenance/standard-entries/RepairAction';

export const KEY = generateUUID();

export const getRepairActions = () => {
  return http.get<RepairAction[]>(uri.maintenance.SE.repairActions.all);
};

export const useRepairActions = () => useQuery(KEY, getRepairActions);
