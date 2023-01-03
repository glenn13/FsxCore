import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairOperationActionComponent from '@app/entities/maintenance/standard-entries/RepairOperationActionComponent';

export const KEY = generateUUID();

export const getRepairOperationActionComponents = () => {
  return http.get<RepairOperationActionComponent[]>(uri.maintenance.SE.repairOperationActions.components.all);
};

export const useRepairOperationActionComponents = () => useQuery(KEY, getRepairOperationActionComponents);
