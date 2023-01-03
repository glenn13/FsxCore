import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairOperationActionVehicle from '@app/entities/maintenance/standard-entries/RepairOperationActionVehicle';

export const KEY = generateUUID();

export const getRepairOperationActionVehicles = () => {
  return http.get<RepairOperationActionVehicle[]>(uri.maintenance.SE.repairOperationActions.vehicles.all);
};

export const useRepairOperationActionVehicles = () => useQuery(KEY, getRepairOperationActionVehicles);
